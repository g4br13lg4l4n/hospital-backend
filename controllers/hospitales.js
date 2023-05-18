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

const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'hospitales'
    })
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'hospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    updateHospital,
    deleteHospital
}
