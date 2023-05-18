const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find({}, 'name img usuario hospital')
        .populate('usuario', 'name img')
        .populate('hospital', 'name img');

    await res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {
    try {
        const medico = new Medico({
            ...req.body,
            usuario: req.uid
        });
        await medico.save();

        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en petición'
        })
    }

}

const updateMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Medico'
    })
}

const deleteMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Medico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}
