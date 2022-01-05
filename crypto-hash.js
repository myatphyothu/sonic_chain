const crypto = require('crypto');

const cryptoHash = (...N) => {
    const hash = crypto.createHash('sha256');
    hash.update(N.sort().join(' '));
    return hash.digest('hex');
}

module.exports = cryptoHash;