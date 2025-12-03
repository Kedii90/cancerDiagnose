const { SERVER_CONFIG } = require('../config/server.js');

// 允许的前端地址列表（支持多个源）
const allowedOrigins = [
    SERVER_CONFIG.FRONTEND_URL,
    // 添加其他可能的前端地址
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    // 可以添加其他开发环境的地址
];

module.exports = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    
    // 获取请求的 Origin
    const origin = req.headers.origin;
    
    // 如果请求的 Origin 在允许列表中，则设置 CORS 头
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // 如果没有匹配的 Origin，使用配置的默认地址
        res.setHeader('Access-Control-Allow-Origin', SERVER_CONFIG.FRONTEND_URL);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
}
