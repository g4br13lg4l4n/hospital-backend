const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitals = await Hospital.find()
        .populate('usuario', 'name email');

    res.json({
        ok: true,
        hospitals
    });
}

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    try {
        const hospital = new Hospital({
            ...req.body,
            usuario: uid
        });
        await hospital.save();

        res.json({
            ok: true,
            hospital: hospital
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error servidor'
        })
    }
}

const updateHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(400).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }

        const changesHospital = {
            ...req.body,
            uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changesHospital, { new: true });
        res.json({
            ok: true,
            hospitalUpdated
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar hospital'
        });
    }

    
}

const deleteHospital = async(req, res = response) => {

    try {
        const id = req.params.id;
        const hospital = await Hospital.findByIdAndDelete(id);
        if (!hospital) {
            return res.status(500).json({
                ok: false,
                msg: 'No se encontró el hospital'
            });
        }
        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar hospital'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    updateHospital,
    deleteHospital
}
