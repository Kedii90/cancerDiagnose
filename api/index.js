const express = require('express');
const client = require("./config/redis.js");
const transporter = require("./config/verify.js");
const User = require("./config/user")
const { spawn } = require('child_process');
const cors = require('./utils/cors');
const path = require('path');
const fs = require('fs');
const app = express();
const {  decrypt,setCookie } = require("./utils");
const { SERVER_CONFIG, getServerUrl } = require('./config/server.js');
// 允许跨域
app.use(cors);

app.use(express.json());
app.post("/send-code", (req, res) => {
    const { email } = req.body;
    if(!email){
        res.status(400).json({error: '缺少 email 或 verify 参数'})
    }
    const verify = Math.floor(Math.random() * 90000) + 10000;
    client.connect().then(() => {
        (async () => {
            await client.set(`verify:${email}`, verify, 'EX', 60);
            const storedValue = await client.get(`verify:${email}`);
            console.log('存入 Redis 的值:', storedValue);
            res.status(200).json({ code: 0, msg: '验证码已发送' })
            client.quit();
        })().catch(err => {
            console.log(err);
            res.status(500).json({error: 'Redis 错误' });
            client.quit();
        });
        // 邮件发送
        transporter.sendMail({
            from: '',
            to: email,
            subject: verify,
            text: `您的验证码是 ${verify}，有效期1分钟，请勿泄露。`
        });
    });


})
app.post('/verify-code', (req, res) => {
    const { email , code , passwd } = req.body;
    if (!code || !email) {
        res.status(400).json({error: '缺少 email 或 code 参数' })
    }
    client.connect().then(() => {
        (async () => {
            const saveVerify = await client.get(`verify:${email}`);
            if (!saveVerify) {
                res.status(401).json({code: 1, msg: '验证码过期'})
            } else if (code !== saveVerify) {
                res.status(401).json({code: 0, msg: '验证码错误'});
            } else {
                const user =new User([email,passwd]);
                user.writer();
                res.status(200).json({code: 2, msg: '注册成功'})
            }
            client.quit();
        })().catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Redis 错误'})
            client.quit();
        });
    });

})
app.post("/login-verify", (req, res) => {
    const cookies = (req.headers.cookie || '').split(";");
    const { email ,passwd } = req.body;
    const cookie= setCookie(email+","+passwd);
    const user =new User([email,passwd]);
    let data = user.reader();
    data= data.replace(/\n/g, '').split(',');
    if(!data[0]) return  res.status(401).json({msg:"用户不存在"});
    res.cookie("userId",cookie,{
        SameSite:'Lax',
        MaxAge:600,
    })
    data.find(item=>item === email)?(data[data.findIndex(item=>item === email)+1]===passwd?   res.status(200).json({msg:"登录成功"}):res.status(401).json({msg:"密码错误"})):  res.status(401).json({msg:"用户不存在"});


})

app.get('/login-verify', (req, res) => {
    const cookies = (req.headers.cookie || '').split(";");
    if(!/^ userId/.test(cookies.slice(-1)[0])){
        res.status(200).json({msg:404});
        return;
    }
    const [a,b] =   decrypt(decodeURIComponent(cookies.slice(-1)[0].trimStart().replace("userId=",""))).split(",");
    const user =new User([a,b]);
    let data = user.reader();
    data= data.replace(/\n/g, '').split(',');
    data.find(item=>item === a)?(data[data.findIndex(item=>item === a)+1]===b?res.status(200).json({msg:"登录成功",data:{a}}):res.status(401).json({msg:"密码错误"})):  res.status(401).json({msg:"用户不存在"});


})
app.post("/predict",async (req, res) => {
    try {
        const {text} = req.body;
        if (!text) {
            return res.status(400).json({error: '未提供文本'});
        }

        // 1. 保存文本到临时文件
        const tempDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        const time = Date.now();
        const inputFilePath = path.join(tempDir, `input_${time}.txt`);
        fs.writeFileSync(inputFilePath, text, 'utf-8');

        // 2. 获取文件的绝对路径并传递给 Python 脚本
        const absoluteFilePath = path.resolve(inputFilePath);
        const modelPath = path.join(__dirname, 'model/dist', 'main');
        // 传递完整的文件路径给 Python 脚本
        const pythonProcess = spawn(modelPath, [absoluteFilePath]);
        let result = '';
        let error = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
            console.log("result",result);
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
            console.log("error",error)
        });
        pythonProcess.on('close', (code) => {
            if (code !== 0 || error) {
                res.status(500).json(new Error(`模型调用失败: ${error}`));
            } else {
                try {
                    // 解析JSON输出
                    const output = JSON.parse(result);
                    console.log("out",output);
                    // 从输出中获取图片路径，如果没有则使用默认路径
                    const imagePath = output.image_path || path.join(__dirname, "Raman Spectrum.jpg");
                    // 从输出中移除 image_path 字段，避免返回给前端
                    const { image_path, ...responseData } = output;
                    let base64Image = '';
                    try {
                        const imageBuffer = fs.readFileSync(imagePath);
                        base64Image = imageBuffer.toString('base64');
                    } catch (imgError) {
                        console.error('读取图片失败:', imgError);
                        // 如果图片读取失败，返回不带图片的结果
                        return res.status(200).json({data: responseData, img: null});
                    }
                    return res.status(200).json({data: responseData, img:`data:image/png;base64,${base64Image}` });
                } catch (e) {
                    return res.status(400).json(new Error(`结果解析失败: ${e.message}`));
                }
            }
        })
    }catch(err){
        console.log(err);
    }


})

// 启动服务器
app.listen(SERVER_CONFIG.PORT, SERVER_CONFIG.HOST, () => {
    console.log(`Express ${SERVER_CONFIG.PROTOCOL.toUpperCase()} 服务器运行在 ${SERVER_CONFIG.PROTOCOL}://${SERVER_CONFIG.HOST === '0.0.0.0' ? 'localhost' : SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`);
    if (SERVER_CONFIG.HOST === '0.0.0.0') {
        console.log('服务器已启动，可通过局域网 IP 访问');
    }
});