const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    // read token from header
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No autorizado'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No autorizado'
        });
    }

}

module.exports = {
    validateJWT
}

