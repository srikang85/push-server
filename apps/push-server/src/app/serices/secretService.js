const path = require('path');
const fs = require('fs');
const homedir = require('os').homedir();
const CryptoJS = require("crypto-js");

export class SecretService {
    static loadSecret() {
        const publicKey = process.env.public_secret_file || path.join(homedir, 'public_secret_file');
        const privateKey = process.env.private_secret_file || path.join(homedir, 'private_secret_file');
        console.log(`Key pairs are expected to be at ${publicKey}, ${privateKey}`);
        fs.readFile(publicKey, { encoding: 'utf-8' }, function (err, data) {
           SecretService.publicKey = data;
        });

        fs.readFile(privateKey, { encoding: 'utf-8' }, function (err, data) {
            SecretService.privateKey = data;
         });
    }
    static getPublicKey() {
        return SecretService.publicKey;
    }
    static getPrivateKey() {
        return SecretService.privateKey;
    }

    static decrypt(data, clientId) {
        const bytes = CryptoJS.AES.decrypt(data, SecretService.publicKey + clientId);
        return bytes?.toString(CryptoJS.enc.Utf8);
    }
 }