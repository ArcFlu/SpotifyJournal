const getRecent = require('./postauth');

const ret = async () => {
    return await getRecent.getRecent();
}

ret().then((data)=>console.log(data));