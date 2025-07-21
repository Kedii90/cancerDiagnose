<script setup name="register">
    import { ref , onUnmounted} from "vue"
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const time = ref(60);
    const msg = ref("注册成功");
    const code = ref(0);
    const email = ref(null);
    const passwd = ref(null);
    let timer;
    const register =async  ()=>{
        if(passwd.value.value.length == 0 ){
             ElMessage("密码不能为空");
             return;
        }
       const response =await fetch("https://192.168.1.5:3000/verify-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ email: "1715892131@qq.com" , code:code.value.value , passwd:passwd.value.value }) 
       })
       const result = await response.json();
   
         if(result.code == 0){
            msg.value = "验证码错误"
             ElMessage(msg.value);
        }else if(result.code == 1){
             msg.value = "验证码失效"
            ElMessage(msg.value);
        }else {
           msg.value = result.msg;
           ElMessage(msg.value);
           router.push("/login");
         
        }

    }
    onUnmounted(()=>{
        if(timer)
        clearInterval(timer);
    })
    const  sure=async (event)=>{
         time.value = 60;
        event.target.disabled = true;
        if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.value))){
          msg.value = "邮箱错误";
          ElMessage(msg.value);
          return;
        }
        const params = new URLSearchParams({
            type:"register"
        });
          const response=await fetch("https://192.168.1.5:3000/send-code?"+params, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email.value.value }) 
           })
           const result = await response.json();
          
           if(result.code == 0 )  {
            console.log(result);
              event.target.disabled = false;
               ElMessage(result.msg);
               return;
           }
           ElMessage(result.msg);
           const sureBtn=event.target;
           sureBtn.style.background = "#808080";
           sureBtn.innerHTML = `${time.value}秒可重新获取`;
           email.value.style.width = "97%";
           sureBtn.style.left= "220px";
           timer = setInterval(()=>{
            if(time.value == 0){
                sureBtn.style.background = "linear-gradient(90deg, #5a8dee 0%, #7fbcfb 100%)";
                sureBtn.style.left = "268px";
                email.value.style.width = "118%";
                sureBtn.innerHTML = "确定";
                sureBtn.disabled = false;
                clearInterval(timer);
                return;
            }
            time.value--;
            sureBtn.innerHTML = `${time.value}秒可重新获取`;
           },1000);
          
 
    }


</script>


<template>
    <div class="register-container">
        <div class="top-bar"></div>
        <h2><span style="color:#5a8dee;">肝组织</span><span style="color:#fff;">检测</span></h2>
        <div class="subtitle">注册账号</div>
         
        <div id="registerForm" >
            <label for="id_username">邮箱</label>
            <div class="email-container">
                <div class="email-input-group">
                    <input type="text" ref="email" name="username" id="id_username" placeholder="Email" required style="width:118%;">
                </div>
                <button type="button" id="confirmBtn" @click="sure" class="confirm-btn">确定</button>
            </div>
            
            <!-- 验证码输入框 -->
            <label for="id_captcha">验证</label>
            <div class="captcha-input-group">
                <input type="text" name="captcha" ref="code" id="id_captcha" placeholder="请输入验证码" required style="width:100%;margin-bottom:18px;">
            </div>
            
            <label for="id_password">密码</label>
            <input type="password" ref="passwd" name="password" id="id_password" placeholder="Password" required>

            <button class="register" @click="register">注册</button>
        </div>
       
          <div class="bottom-bar"></div>
    </div>

</template>



<style>
       .register-container {
           
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #232946;
            border-radius: 18px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            width: 370px;
            padding: 0 36px 36px 36px;
            color: #fff;
            overflow: hidden;
        }
        .register-container .top-bar {
            height: 6px;
            width: 100%;
            background: linear-gradient(90deg, #5a8dee 0%, #7fbcfb 100%);
            border-radius: 18px 18px 0 0;
            margin-bottom: 28px;
        }
         .register-container .bottom-bar {
            height: 6px;
            width: 100%;
            background: linear-gradient(90deg, #7fffac 0%, #b6ffec 100%);
            border-radius: 0 0 18px 18px;
            margin-top: 28px;
        }
        .register-container h2 {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 6px 0;
            letter-spacing: 1px;
        }
        .register-container .subtitle {
            text-align: center;
            color: #bfc9e0;
            font-size: 1rem;
            margin-bottom: 24px;
        }
        .register-container label {
            display: block;
            margin-bottom: 6px;
            color: #bfc9e0;
            font-size: 0.98rem;
        }
        .register-container input[type="text"],
        .register-container input[type="password"] {
            width: 100%;
            padding: 11px 12px;
            margin-bottom: 18px;
            border: none;
            border-radius: 8px;
            background: #1a2036;
            color: #fff;
            font-size: 1rem;
            outline: none;
            box-sizing: border-box;
        }
        .register-container input[type="text"]::placeholder,
        .register-container input[type="password"]::placeholder {
            color: #7a88b6;
        }
        .register-container .form-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;
        }
        .register-container .remember {
            display: flex;
            align-items: center;
            font-size: 0.97rem;
            color: #bfc9e0;
        }
        .register-container .remember input[type="checkbox"] {
            margin-right: 6px;
        }
        .register-container .forgot {
            color: #7fbcfb;
            text-decoration: none;
            font-size: 0.97rem;
            cursor: pointer;
            transition: color 0.2s;
        }
        .register-container .forgot:hover {
            color: #5a8dee;
        }
        .register-container .register {
            width: 100%;
            padding: 13px;
            background: linear-gradient(90deg, #a084ee 0%, #8f6ed5 100%);
            color: #fff;
            border: none;
            border-radius: 24px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            margin-top: 8px;
            margin-bottom: 10px;
            transition: background 0.2s;
            box-shadow: 0 2px 8px 0 rgba(160, 132, 238, 0.15);
        }
        .register-container .register:hover {
            background: linear-gradient(90deg, #8f6ed5 0%, #a084ee 100%);
        }
        .register-container .signup {
            text-align: center;
            margin-top: 10px;
            color: #bfc9e0;
            font-size: 0.98rem;
        }
        .register-container .signup a {
            color: #7fbcfb;
            font-weight: bold;
            text-decoration: underline;
        }
        .register-container .signup a:hover {
            color: #5a8dee;
        }
        .footer {
            text-align: center;
            margin-top: 32px;
            color: #bfc9e0;
            font-size: 0.97rem;
            letter-spacing: 0.5px;
        }
        .footer .heart {
            color: #a084ee;
        }
         .email-container {
            display: flex;
            gap: 10px;
            align-items: flex-end;
            margin-bottom: 18px;
            position: relative;
        }
        
        .confirm-btn {
            background: linear-gradient(90deg, #5a8dee 0%, #7fbcfb 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
            min-width: 50px;
            height: 30px;
            position: absolute;
            left:270px;
            top:4px;
            
        }
        
        .confirm-btn:hover {
            background: linear-gradient(90deg, #4a7dee 0%, #6facfb 100%);
            transform: translateY(-1px);
        }
        
        .confirm-btn:disabled {
            background: #4a5568;
            cursor: not-allowed;
            transform: none;
        }

</style>