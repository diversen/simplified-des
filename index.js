var generateKeys = require('./generateKeys')
var crypt = require('./crypt')

var simpleDES = {
    generateKeys: generateKeys,
    encrypt: crypt.encrypt,
    decrypt: crypt.decrypt
}

module.exports = simpleDES;