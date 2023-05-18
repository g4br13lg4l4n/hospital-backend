const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        // delete the imagen old
        fs.unlinkSync(path);
    }
}

const updateImage = async (type, id, nameFile) => {
    let pathOld = '';
    switch (type) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            pathOld = `./uploads/medicos/${medico.img}`;
            deleteImage(pathOld);
            
            medico.img = nameFile;
            await medico.save();
            return true;

        case 'hospitales':
            const hospitales = await Hospital.findById(id);
            if (!hospitales) {
                return false;
            }
            pathOld = `./uploads/medicos/${hospitales.img}`;
            deleteImage(pathOld);
            
            hospitales.img = nameFile;
            await hospitales.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            pathOld = `./uploads/medicos/${usuario.img}`;
            deleteImage(pathOld);
            
            usuario.img = nameFile;
            await usuario.save();
            return true;

        default:
            return res.status(400).json({
                ok: false,
                msg: "No se entró la tabla de búsqueda"
            });
    }

}

module.exports = {
    updateImage
}