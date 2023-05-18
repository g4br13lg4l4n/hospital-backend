const fs = require('fs');
const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');


const uploadFile = (req, res = response) => {

    const type = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }
    // valid if file exist
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        });
    }

    // Process image
    const file = req.files.image;
    const cutName = file.name.split('.');
    const extensionFile = cutName[cutName.length - 1];

    // Valid extension
    const extensionRight = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionRight.includes(extensionFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'tipo de imagen no valida'
        });
    }

    // generate image name
    const nameFile = `${uuidv4()}.${extensionFile}`

    // Patch to save image
    const path = `./uploads/${type}/${nameFile}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al cargar la imagen'
            });
        }

        // Update DB
        updateImage(type, id, nameFile);

        res.json({
            ok: true,
            msg: 'Carga de archivo exitosa ' + nameFile
        });
    });
}

const returnPhoto = (req, res = response) => {
    const type = req.params.tipo;
    const photo = req.params.photo;

    const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const imgDefault = path.join(__dirname, `../uploads/no_img.jpeg`);
        res.sendFile(imgDefault);
    }
}

module.exports = {
    uploadFile,
    returnPhoto
}