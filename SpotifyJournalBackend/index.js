const getRecent = require('./getRecent');

exports.handler =  async function() {
    getRecent();
    return;
}