// 后端服务器全局配置
// 修改这里即可更改所有后端服务器相关的IP地址和端口
// 当网络IP改变时，只需修改这里的值即可

const SERVER_CONFIG = {
  // 服务器监听IP地址
  // 使用 '0.0.0.0' 可以监听所有网络接口（推荐，方便局域网访问）
  // 使用具体IP如 '192.168.1.3' 只监听指定IP
  // 使用 'localhost' 只允许本地访问
  HOST: '192.168.1.192',  // 推荐使用 0.0.0.0 以便局域网访问
  
  // 服务器端口
  PORT: 3000,
  
  // 协议类型：'http' 或 'https'
  PROTOCOL: 'http',  // 根据实际需求选择
  
  // 前端地址（用于 CORS 跨域配置）
  // 如果前端在不同IP或端口，修改这里
  FRONTEND_URL: 'http://localhost:8080',
  
  // HTTPS 证书配置（仅在 PROTOCOL 为 'https' 时需要）
  HTTPS: {
    // 证书文件路径（相对于 api 目录）
    // 注意：证书文件名中如果包含IP，需要与当前服务器IP匹配
    KEY_PATH: './cert/192.168.1.5-key.pem',
    CERT_PATH: './cert/192.168.1.5.pem'
  }
}

// 获取服务器完整地址
function getServerUrl() {
  const ip = SERVER_CONFIG.HOST === '0.0.0.0' ? 'localhost' : SERVER_CONFIG.HOST
  return `${SERVER_CONFIG.PROTOCOL}://${ip}:${SERVER_CONFIG.PORT}`
}

// 导出配置
module.exports = {
  SERVER_CONFIG,
  getServerUrl
}

