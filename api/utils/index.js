const { publicEncrypt , privateDecrypt  } = require('crypto');
const crypto = require('crypto');
const secretKey = Buffer.from('your-32-byte-secret-key-12345678', 'utf8').subarray(0, 32);
function setCookie(id){
    return encrypt(id);

}
// 加密
function encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// 解密
function decrypt(encryptedData) {
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


module.exports = {
    setCookie,
    decrypt
}
