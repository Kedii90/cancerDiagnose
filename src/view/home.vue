<template>
     <div class="container">
        <!-- 头部区域 -->
        <div class="header">
            <h1>🏥 肝癌检测系统</h1>
            <p class="welcome-text">欢迎回来，{{data.data}}！</p>
            <!-- <router-link to="/login" @click="logout"  class="logout-btn">退出登录</router-link> -->
        </div>
        <div class="main-content">
            <div class="upload-section">
                <h2>📁 文件上传</h2>
                <div class="upload-form">
                    <div class="file-input-wrapper">
                        <input type="file" name="file" class="file-input" required>
                    </div>
                    <button @click="handleSubmit" class="upload-btn">
                        <span class="btn-text" >开始检测</span>
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>正在分析中...</p>
                        </div>
                    </button>
                </div>
            </div>

            <div class="info-section">
                <h2>ℹ️ 使用说明</h2>
                <div class="info-content">
                    <p>本系统采用先进的深度学习技术，能够检测肝组织情况。</p>
                    <ul>
                        <li><strong>支持格式：</strong>JPG、PNG、JPEG等常见图片格式</li>
                        <li><strong>检测时间：</strong>通常在3分钟内完成分析</li>
                        <li><strong>准确率：</strong>基于大量临床数据训练，准确率超过95%</li>
                        <li><strong>隐私保护：</strong>所有上传的图片仅用于检测，不会存储</li>
                    </ul>
                </div>
            </div>
        </div>

       
        <div class="features-grid">
            <div class="feature-card">
                <h3>🔒 安全可靠</h3>
                <p>严格的数据保护措施，确保用户隐私安全</p>
            </div>
        </div>

      
        <div class="footer">
            <p>© 2025 肝癌检测系统 - 为您的健康保驾护航</p>
        </div>
    </div>

</template>


<script setup name="home">
   import { onMounted } from "vue";
   import { useRouter, useRoute } from 'vue-router';
   import { getApiUrl } from '../config/api.js';
   import API_CONFIG from '../config/api.js';
   let record_txt;
   const router = useRouter();
   const route = useRoute();

   const data=JSON.parse(route.params.data);

   onMounted(()=>{
       const input = document.querySelector(".file-input");
          input.addEventListener("change",(event)=>{
          record_txt = event.target.files[0];
     });
})
   

   function handleSubmit(){


      const btn = document.querySelector('.upload-btn');
      const btnText = document.querySelector('.btn-text');
      const loading = document.querySelector('.loading');
    
      
            // 显示加载状态
      btnText.style.display = 'none';
      loading.style.display = 'block';
      btn.disabled = true;
            const reader = new FileReader();
            reader.onload = async (e) => {
            const fileContent = e.target.result; // 读取的文本内容
            try{
                  const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.PREDICT), {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                   body: JSON.stringify({ text: fileContent })
            });     
            let result =(await response.json());
            result.data["data"] =data.data;
            if(result){
                router.push({
                   name:"result",
                   params: {
                      data:JSON.stringify(result)
                    }
             }) ;
        }
             
                }catch(error){
                   console.log(error);
            }
      };
           reader.readAsText(record_txt); // 以文本形式读取

          

      
      
            
           
   
   }
</script>



<style scoped>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .header h1 {
            color: #4a5568;
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .welcome-text {
            color: #718096;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }

        .logout-btn {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .upload-section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .upload-section h2 {
            color: #4a5568;
            font-size: 1.8rem;
            margin-bottom: 20px;
            text-align: center;
        }

        .upload-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .file-input-wrapper {
            position: relative;
            display: inline-block;
            width: 100%;
        }

        .file-input {
            width: 100%;
            padding: 15px;
            border: 2px dashed #cbd5e0;
            border-radius: 15px;
            background: #f7fafc;
            font-size: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .file-input:hover {
            border-color: #667eea;
            background: #edf2f7;
        }

        .file-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .upload-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }

        .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .info-section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .info-section h2 {
            color: #4a5568;
            font-size: 1.8rem;
            margin-bottom: 20px;
            text-align: center;
        }

        .info-content {
            color: #718096;
            line-height: 1.6;
        }

        .info-content ul {
            margin: 15px 0;
            padding-left: 20px;
        }

        .info-content li {
            margin-bottom: 10px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .feature-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-card h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
        }

        .feature-card p {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .footer {
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .container {
                padding: 10px;
            }
        }

        .loading {
            display: none;
            text-align: center;
            margin-top: 20px;
        }

        .loading-spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

</style>