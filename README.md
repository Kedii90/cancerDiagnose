# cancerDiagnose

肝癌检测系统 - 基于深度学习的肝组织检测应用

## 项目结构

- `api/` - 后端服务器代码
  - `config/` - 配置文件
    - `server.js` - **后端全局服务器配置（重要）**
  - `index.js` - HTTP 服务器入口
  - `server.js` - HTTPS 服务器入口（可选）
- `src/` - 前端 Vue 项目代码
  - `config/` - 配置文件
    - `api.js` - **前端全局 API 配置（重要）**
  - `view/` - 页面组件
  - `router/` - 路由配置

## 全局配置说明

### 重要提示

本项目使用**全局配置管理**，前端和后端的 IP 地址都集中在配置文件中管理。当网络环境改变时，只需修改配置文件即可，无需逐个修改代码中的 IP 地址。

---

## 前端全局 API 配置

### 配置位置

前端所有 API 请求的 IP 地址和端口都集中在 `src/config/api.js` 文件中配置。

### 配置方法

1. 打开 `src/config/api.js` 文件

2. 修改 `BASE_URL` 配置项：

```javascript
const API_CONFIG = {
  // 修改这里的 IP 地址和端口
  BASE_URL: 'http://192.168.1.3:3000',  // 改为您当前的后端服务器 IP
  
  // API 端点路径（通常无需修改）
  ENDPOINTS: {
    LOGIN_VERIFY: '/login-verify',
    REGISTER: '/register',
    SEND_CODE: '/send-code',
    VERIFY_CODE: '/verify-code',
    PREDICT: '/predict'
  }
}
```

3. 示例：

```javascript
// 使用 HTTP
BASE_URL: 'http://192.168.1.3:3000'

// 使用 HTTPS
BASE_URL: 'https://192.168.1.5:3000'

// 更改端口
BASE_URL: 'http://192.168.1.3:8080'

// 使用本地地址
BASE_URL: 'http://localhost:3000'
```

### 配置生效范围

修改 `BASE_URL` 后，以下所有接口会自动使用新的 IP 地址：

- ✅ 登录验证 (`/login-verify`)
- ✅ 用户注册 (`/register`)
- ✅ 发送验证码 (`/send-code`)
- ✅ 验证码校验 (`/verify-code`)
- ✅ 预测检测 (`/predict`)

## 开发说明

### 前端开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 构建生产版本
npm run build
```

---

## 后端全局服务器配置

### 配置位置

后端服务器相关的 IP 地址、端口和协议配置都在 `api/config/server.js` 文件中。

### 配置方法

1. 打开 `api/config/server.js` 文件

2. 修改配置项：

```javascript
const SERVER_CONFIG = {
  // 服务器监听IP地址
  // '0.0.0.0' - 监听所有网络接口（推荐，方便局域网访问）
  // '192.168.1.3' - 只监听指定IP
  // 'localhost' - 只允许本地访问
  HOST: '0.0.0.0',  // 推荐使用 0.0.0.0
  
  // 服务器端口
  PORT: 3000,
  
  // 协议类型：'http' 或 'https'
  PROTOCOL: 'http',
  
  // 前端地址（用于 CORS 跨域配置）
  FRONTEND_URL: 'http://192.168.1.3:8080',
  
  // HTTPS 证书配置（仅在使用 HTTPS 时需要）
  HTTPS: {
    KEY_PATH: './cert/192.168.1.5-key.pem',
    CERT_PATH: './cert/192.168.1.5.pem'
  }
}
```

3. 配置说明：

- **HOST**: 服务器监听地址
  - `0.0.0.0` - 推荐，允许局域网内所有设备访问
  - 具体 IP（如 `192.168.1.3`）- 只监听该 IP
  - `localhost` - 仅本地访问

- **PORT**: 服务器端口号（默认 3000）

- **PROTOCOL**: 协议类型
  - `http` - HTTP 协议（默认）
  - `https` - HTTPS 协议（需要配置证书）

- **FRONTEND_URL**: 前端访问地址，用于 CORS 跨域配置

### 配置生效范围

修改配置后，以下功能会自动使用新配置：

- ✅ 服务器监听 IP 和端口
- ✅ CORS 跨域配置
- ✅ HTTPS 证书路径（如使用 HTTPS）

### 后端开发

```bash
# 进入后端目录
cd api

# 安装依赖
npm install

# 启动服务器（HTTP 模式）
npm start
# 或
node index.js

# 启动服务器（HTTPS 模式，需要证书）
node server.js
```

### 服务器文件说明

- **`api/index.js`** - HTTP 服务器入口（默认使用）
- **`api/server.js`** - HTTPS 服务器入口（需要配置证书）

### 启动服务器

1. **检查配置**：确认 `api/config/server.js` 中的配置正确
2. **启动 Redis**：确保 Redis 服务已启动（如果使用）
3. **启动服务器**：
   ```bash
   cd api
   npm start
   ```
4. **查看日志**：服务器启动后会显示监听的地址和端口

### 常见问题

1. **无法局域网访问**：
   - 将 `HOST` 设置为 `0.0.0.0`
   - 检查防火墙设置

2. **CORS 跨域错误**：
   - 确认 `FRONTEND_URL` 与前端实际地址一致
   - 检查前端配置的 `BASE_URL` 与后端地址匹配

3. **HTTPS 证书错误**：
   - 确认证书文件存在于 `api/cert/` 目录
   - 检查证书文件名与配置中的路径一致

## 配置同步说明

### 前后端配置关联

前后端的 IP 配置需要保持一致：

1. **后端配置** (`api/config/server.js`):
   - `HOST`: 后端服务器监听地址
   - `PORT`: 后端服务器端口
   - `PROTOCOL`: 协议类型

2. **前端配置** (`src/config/api.js`):
   - `BASE_URL`: 后端服务器访问地址，格式：`${PROTOCOL}://${IP}:${PORT}`
   - 例如：后端 `HOST: '192.168.1.3'`, `PORT: 3000`, `PROTOCOL: 'http'`
   - 前端应配置：`BASE_URL: 'http://192.168.1.3:3000'`

3. **CORS 配置** (`api/config/server.js`):
   - `FRONTEND_URL`: 前端访问地址，需要与前端实际运行地址一致

### 配置示例

假设后端运行在 `192.168.1.3:3000`，前端运行在 `192.168.1.3:8080`：

**后端配置** (`api/config/server.js`):
```javascript
HOST: '0.0.0.0',  // 或 '192.168.1.3'
PORT: 3000,
PROTOCOL: 'http',
FRONTEND_URL: 'http://192.168.1.3:8080',
```

**前端配置** (`src/config/api.js`):
```javascript
BASE_URL: 'http://192.168.1.3:3000',
```

## 注意事项

1. **IP 地址配置**：
   - 确保前端 `BASE_URL` 与后端实际运行地址一致
   - 确保后端 `FRONTEND_URL` 与前端实际运行地址一致

2. **网络环境**：
   - 当更换网络环境（如切换 WiFi）导致 IP 地址改变时
   - 需要同时更新前端和后端的配置文件

3. **HTTPS 配置**：
   - 如果后端使用 HTTPS，需要在前端 `BASE_URL` 中使用 `https://`
   - 后端 `PROTOCOL` 需设置为 `https`
   - 确保证书文件存在且路径正确

4. **CORS 配置**：
   - 后端已自动使用全局配置的 `FRONTEND_URL` 进行 CORS 设置
   - 确保 `FRONTEND_URL` 与前端实际地址匹配

5. **服务器启动**：
   - 推荐使用 `0.0.0.0` 作为 `HOST`，这样可以同时通过 localhost 和局域网 IP 访问
   - 使用 `localhost` 时只能本地访问，局域网内其他设备无法访问

## 使用流程

1. **配置后端**：修改 `api/config/server.js` 中的 IP 和端口配置
2. **配置前端**：修改 `src/config/api.js` 中的 `BASE_URL`，确保与后端地址一致
3. **启动后端**：
   ```bash
   cd api
   npm install  # 首次运行需要
   npm start
   ```
4. **启动前端**：
   ```bash
   npm install  # 首次运行需要
   npm run serve
   ```
5. **访问应用**：在浏览器中访问前端地址（默认通常是 `http://localhost:8080`）
6. **使用功能**：注册/登录后上传文件进行检测
