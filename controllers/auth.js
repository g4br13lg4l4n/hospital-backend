const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

        if (!validPassword) {
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

const googleSignIn = async (req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token.credential);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                name,
                email,
                password: '123456',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });


    } catch (error) {
        console.log('error --->', error);
        res.status(400).json({
            ok: false,
            msg: 'Auth incorrecta'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    // Generar new token
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}

