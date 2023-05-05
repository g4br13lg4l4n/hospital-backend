const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const userDB = await Usuario.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña no valida'
            });
        }

        const validPassword = bcryptjs.compareSync(password, userDB.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña no valida"
            })
        }

        // generar JWT
        const token = await generarJWT(userDB.id);

        res.json({
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servicio'
        });
    }
}

module.exports = {
    login
}

