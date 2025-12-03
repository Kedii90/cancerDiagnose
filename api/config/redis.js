const redis = require("redis");
const client = redis.createClient({
    legacyMode: false,
    host: 'localhost', //本地 注意此处不要加http或https
    port: 6379 //端口号默认6379
});
module.exports = client;