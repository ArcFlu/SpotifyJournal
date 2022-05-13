const getRecent = require('./postauth');

exports.handler = async () => {
    const lambdaOut = await getRecent.getRecent();
    return lambdaOut;
}
