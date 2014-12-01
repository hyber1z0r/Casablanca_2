var generator = require('password-generator');
var passwordHash = require('password-hash');

function generateUserPw(guest) {
    guest.username = generator(10, true, /$/, 'casa-');
    guest.password = generator(6, true);
}

function hashPw(guest) {
    guest.password = passwordHash.generate(guest.password);
}

function verify(password, hashed) {
    return passwordHash.verify(password, hashed);
}

module.exports.generate = generateUserPw;
module.exports.hash = hashPw;
module.exports.verify = verify;