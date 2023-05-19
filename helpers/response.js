
const responseJson = (res, status = 200, ok = true, msg = '') => {
    let bodyRes = msg;
    if (typeof(msg) === 'string') {
        bodyRes.msg = msg;
    }
    return res.status(status).json({
        ok,
        msg
    });
}

module.exports = {
    responseJson
};