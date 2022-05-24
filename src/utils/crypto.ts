import CryptoJS from 'crypto-js';

const keySize = 256;
const iterations = 100;

export const encrypt = (msg: string, pass: string): string => {
  try {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return salt.toString() + iv.toString() + encrypted.toString();
  } catch (error) {
    return '';
  }
};

export const decrypt = (msg: string, pass: string): string => {
  try {
    const salt = CryptoJS.enc.Hex.parse(msg.substring(0, 32));
    const iv = CryptoJS.enc.Hex.parse(msg.substring(32, 32));
    const encrypted = msg.substring(64);

    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    return CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return '';
  }
};