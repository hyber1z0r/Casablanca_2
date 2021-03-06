var generator = require('password-generator');
var passwordHash = require('password-hash');

function generateUserPw(guest) {
    guest.username = generator(10, true, /$/, 'casa-');
    guest.password = generator(6, true);
    guest.role = 'user';
}

function hashPw(guest) {
    guest.password = passwordHash.generate(guest.password);
}

function verify(password, hashed) {
    return passwordHash.verify(password, hashed);
}

function hashOnlyPassword(pw){
    return passwordHash.generate(pw);
}
//
//var test = {
//    name: 'Lars',
//    last: 'Hansen'
//};
//generateUserPw(test);
//console.log(test);
//hashPw(test);
//console.log(test);



module.exports.generate = generateUserPw;
module.exports.hash = hashPw;
module.exports.verify = verify;
module.exports.hashPW = hashOnlyPassword;