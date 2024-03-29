const jwt = require('jsonwebtoken');
const { Promise } = require('mongoose');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error en JWT');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}