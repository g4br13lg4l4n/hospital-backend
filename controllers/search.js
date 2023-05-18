const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const searchAll = async (req, res = response) => {
    const busqueda = req.params.dataSearch;

    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ name: regex }),
        Medico.find({ name: regex }),
        Hospital.find({ name: regex })
    ]);

    res.json({
        ok: 'ok',
        usuarios,
        medicos,
        hospitales
    })
}

const collectionSearch = async (req, res = response) => {

    const table = req.params.table;
    const busqueda = req.params.dataSearch;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (table) {
        case 'medicos':
            data = await Medico.find({ name: regex })
                .populate('usuario', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitales':

            data = await Hospital.find({ name: regex })
                .populate('usuario', 'name img');
            break;
        case 'usuarios':
            data = await Usuario.find({ name: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: "No se entró la tabla de búsqueda"
            });
    }

    res.json({
        ok: 'ok',
        data
    })
}


module.exports = {
    searchAll,
    collectionSearch
}