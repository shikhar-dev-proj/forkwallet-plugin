import CryptoJS from 'crypto-js';

export const encrypt = (msg: string, pass: string): string => {
  try {
    return CryptoJS.AES.encrypt(msg, pass).toString();
  } catch (error) {
    return '';
  }
};

export const decrypt = (msg: string, pass: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(msg, pass);
    const str = decrypted.toString(CryptoJS.enc.Utf8);
    if (str.length > 0) {
      return str;
    } else {
      return '';
    } 
  } catch (e) {
    return '';
  }
};
