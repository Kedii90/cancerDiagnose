// API全局配置
// 修改这里即可更改所有API请求的IP地址和端口
// 当网络IP改变时，只需修改 BASE_URL 中的IP地址即可，所有API请求会自动使用新IP

const API_CONFIG = {
  // 后端服务器IP地址和端口
  // 当前配置: http://192.168.1.3:3000
  // 如果需要更改IP，只需修改这里的值即可
  // 例如: 'http://192.168.1.5:3000' 或 'http://192.168.0.100:3000'
  BASE_URL: 'http://192.168.1.192:3000',
  
  // 如果需要使用HTTPS，可以修改为:
  // BASE_URL: 'https://192.168.1.5:3000',
  
  // 如果后端在不同端口，修改端口号即可:
  // BASE_URL: 'http://192.168.1.3:8080',
  
  // API端点路径（无需修改，除非后端路径改变）
  ENDPOINTS: {
    LOGIN_VERIFY: '/login-verify',
    REGISTER: '/register',
    SEND_CODE: '/send-code',
    VERIFY_CODE: '/verify-code',
    PREDICT: '/predict'
  }
}

// 获取完整的API URL
export function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// 导出配置供其他地方使用
export default API_CONFIG
