const { response } = require('express');
const Medico = require('../models/medico');
const { responseJson } = require('../helpers/response');

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

const updateMedico = async (req, res = response) => {
    try {
        const id = req.params.id;
        console.log(id)
        const medicoUpdated = await Medico.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!medicoUpdated) {
            return responseJson(res, 500, false, 'No se encontró  médico a actualizar');
        }
        responseJson(res, 200, true, medicoUpdated);
    } catch (error) {
        console.log(error)
        return responseJson(res, 500, false, 'Error en actualización');
    }
}

const deleteMedico = async(req, res = response) => {
    try {
        const id = req.params.id;
        const medicoDeleted = await Medico.findByIdAndDelete(id, { new: true });
        if (!medicoDeleted) {
            return responseJson(res, 500, false, 'No se encontró  médico a eliminar');
        }
        responseJson(res, 200, true, medicoDeleted);
    } catch (error) {
        console.log(error)
        return responseJson(res, 500, false, 'Error en actualización');
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}
