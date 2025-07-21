<template>
       <div class="container">
        <!-- 头部区域 -->
        <div class="header">
            <div class="success-icon pulse">✅</div>
            <h1>检测完成！</h1>
            <p>文件上传成功，AI分析已完成</p>
        </div>

        <!-- 主要内容区域 -->
        <div class="content">
            <!-- 检测结果区域 -->
            <div class="result-section">
                <div class="result-content">
                    <div class="status-badge status-success">检测完成</div>
                    <div class="diagnosis">{{ data.data.message }}</div>
                    <div class="confidence">AI诊断结果</div>
                </div>
            </div>

            <!-- 图片显示区域 -->
           
            <div class="image-section">
                <h3>📸 拉曼光谱图</h3>
                <img :src="data.img" alt="上传的图片" class="uploaded-image">
            </div>
           

            
            <!-- 操作按钮区域 -->
            <div class="actions">
                <RouterLink :to="{
                      name:'home',
                      params: {
                        data:JSON.stringify({data:data.data.data})
                    }
                }" class="btn btn-primary">🏠 返回主页</RouterLink>
            </div>
        </div>

        <!-- 页脚 -->
        <div class="footer">
            <p>© 2025 肝组织检测系统 - 为您的健康保驾护航</p>
        </div>
    </div>

</template>




<script setup name="result">
    import { RouterLink, useRoute} from 'vue-router';
    const route = useRoute();
    const data=JSON.parse(route.params.data);
</script>


<style scoped>
     
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 25px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }

        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }

        .success-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }

        .content {
            padding: 40px;
        }

        .result-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .result-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        .result-content {
            position: relative;
            z-index: 1;
        }

        .diagnosis {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .confidence {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .image-section {
            background: #f8fafc;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
        }

        .image-section h3 {
            color: #4a5568;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .uploaded-image {
            max-width: 100%;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }

        .uploaded-image:hover {
            transform: scale(1.02);
        }

        .file-info {
            background: #edf2f7;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
        }

        .file-info h3 {
            color: #4a5568;
            font-size: 1.3rem;
            margin-bottom: 15px;
        }

        .file-url {
            background: white;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #e2e8f0;
            word-break: break-all;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            color: #4a5568;
        }

        .file-url a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }

        .file-url a:hover {
            text-decoration: underline;
        }

        .actions {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #f093fb, #f5576c);
            color: white;
        }

        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
        }

        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .status-success {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
        }

        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }

        .footer p {
            color: #718096;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 20px;
            }
            
            .actions {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                text-align: center;
            }
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
   

</style>