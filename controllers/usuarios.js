const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'name email role google');

    await res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}

const crearUsuario = async (req, res = response) => {
    const { password, email } = req.body;

    try {
        const existEmail = await Usuario.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);


        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        // generar JWT
        const token = await generarJWT(usuario.id);
        await res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar Log'
        });
    }
}

const updateUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con el id:' + uid
            });
        }


        //Update flow
        const { password, google, email, ...campos } = req.body;
        /**
         * Evitamos usar el delete - const { password, google, ...campos }
            delete campos.password;
            delete campos.google;
         */
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe el usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        // Regresa el nuevo resultado { new: true }

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar Log'
        });
    }
}

const deleteUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con el id:' + uid
            });
        }

        const user = await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            usuario: user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar Log'
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}