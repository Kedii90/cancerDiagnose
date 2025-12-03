const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '', // 发送方邮箱
        pass: ''              // 不是密码！是SMTP授权码！
    }
});
module.exports =transporter;