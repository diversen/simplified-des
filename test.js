var simpleDES = require('./index');

var key = '1010000010';
var keys = simpleDES.generateKeys(key);

var plain = '01110010';
console.log('Plain text: ', plain);

var cipher = simpleDES.encrypt(plain, keys);
console.log('Cipher text: ', cipher);

var plain_returned = simpleDES.decrypt(cipher, keys);
console.log('Plain text decrypted: ', plain_returned)