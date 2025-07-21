<template>
      <div class="login-container">
        <div class="top-bar"></div>
        <h2><span style="color:#5a8dee;">肝组织</span><span style="color:#fff;">检测</span></h2>
        <div class="subtitle">登录账号</div>
        <form @submit.prevent="handleSubmit" id="loginForm">
            <label for="id_username">邮箱</label>
            <div class="email-container">
                <div class="email-input-group">
                    <input type="text" ref="email" name="username" id="id_username" @click="emailInput" placeholder="Email" required>
                </div>
            </div>
            <label for="id_password">密码</label>
            <input type="password" name="password"   ref="passwd" id="id_password" placeholder="Password" required >
            <div class="form-row">
                <div class="remember">
                    <input type="checkbox" id="remember" name="remember" >
                    <label for="remember" style="margin-bottom:0;">记住我</label>
                </div>
                <router-link class="forgot" to="/forgot">忘记密码</router-link>
            </div>
            <button type="submit" @click="verify">登录</button>
        </form>
        <div class="signup">
            没有账号 <router-link to="/register">注册</router-link>
        </div>
        <div class="bottom-bar"></div>
    </div>
   
</template>



<script setup name="login">
import { ref } from "vue"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
const msg = ref("成功登录");
const email = ref(null);
const passwd = ref(null);
async function verify(){
  if(email.value.value.length==0){
        msg.value = "邮箱不能为空";
        ElMessage(msg.value);
  }
  if(passwd.value.length == 0 ){
        msg.value = "密码不能为空";
        ElMessage(msg.value);
  }
    
   const response =await fetch("https://192.168.1.5:3000/login-verify",{
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({ email: email.value.value , passwd:passwd.value.value}) 
     })
    
   const result = await response.json();
   ElMessage(result.msg);
   if(result.code !== 1 )return ;

   router.push({name:"home",
    params:{
         data:JSON.stringify({data:email.value.value})
    }
   });
   

   
  
}

</script>


<style scoped>
        .login-container {
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
        .login-container .top-bar {
            height: 6px;
            width: 100%;
            background: linear-gradient(90deg, #5a8dee 0%, #7fbcfb 100%);
            border-radius: 18px 18px 0 0;
            margin-bottom: 28px;
        }
        .login-container .bottom-bar {
            height: 6px;
            width: 100%;
            background: linear-gradient(90deg, #7fffac 0%, #b6ffec 100%);
            border-radius: 0 0 18px 18px;
            margin-top: 28px;
        }
        .login-container h2 {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 6px 0;
            letter-spacing: 1px;
        }
        .login-container .subtitle {
            text-align: center;
            color: #bfc9e0;
            font-size: 1rem;
            margin-bottom: 24px;
        }
        .login-container label {
            display: block;
            margin-bottom: 6px;
            color: #bfc9e0;
            font-size: 0.98rem;
        }
        .login-container input[type="text"],
        .login-container input[type="password"] {
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
        .login-container input[type="text"]::placeholder,
        .login-container input[type="password"]::placeholder {
            color: #7a88b6;
        }
        .login-container .form-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;
        }
        .login-container .remember {
            display: flex;
            align-items: center;
            font-size: 0.97rem;
            color: #bfc9e0;
        }
        .login-container .remember input[type="checkbox"] {
            margin-right: 6px;
        }
        .login-container .forgot {
            color: #7fbcfb;
            text-decoration: none;
            font-size: 0.97rem;
            cursor: pointer;
            transition: color 0.2s;
        }
        .login-container .forgot:hover {
            color: #5a8dee;
        }
        .login-container button[type="submit"] {
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
        .login-container button[type="submit"]:hover {
            background: linear-gradient(90deg, #8f6ed5 0%, #a084ee 100%);
        }
        .login-container .signup {
            text-align: center;
            margin-top: 10px;
            color: #bfc9e0;
            font-size: 0.98rem;
        }
        .login-container .signup a {
            color: #7fbcfb;
            font-weight: bold;
            text-decoration: underline;
        }
        .login-container .signup a:hover {
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
        
        /* 邮箱和确定按钮容器 */
        .email-container {
            display: flex;
            gap: 10px;
            align-items: flex-end;
            margin-bottom: 18px;
            position: relative;
        }
        
        .email-input-group {
            flex: 1;
        }
        
        .email-input-group label {
            display: block;
            margin-bottom: 6px;
            color: #bfc9e0;
            font-size: 0.98rem;
        }
        
        .email-input-group input[type="text"] {
            width: 100%;
            padding: 11px 12px;
            border: none;
            border-radius: 8px;
            background: #1a2036;
            color: #fff;
            font-size: 1rem;
            outline: none;
            box-sizing: border-box;
        }
        
        .email-input-group input[type="text"]::placeholder {
            color: #7a88b6;
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
            left:317px;
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