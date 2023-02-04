const express = require('express');
const Mascota = require('../models/Mascota');
const Usuario = require('../models/Usuario');
const Solicitud = require('../models/Solicitud');


const generarSolicitud = async(req, res = express.response) => {

    console.log(req.body)
    const solicitud = new Solicitud(req.body.data);

    try {

        solicitud.user = req.uid
        solicitud.userName = req.name

        solicitud.pet = req.body.data.id
        solicitud.userPet = req.body.data.user
        solicitud.petName = req.body.data.name
        solicitud.petImage = req.body.data.image

        solicitud.date = Date()
        solicitud.status = "Pending"
        
        //console.log(solicitud)

        //console.log(req.body.id)
        

        const nuevaSolicitud = await solicitud.save();

        
        res.json({
            ok: true,
            solicitud: nuevaSolicitud

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });
        
    }

}

const verSolicitudes = async(req, res = express.response) => {
    try {
        const solicitud = await Solicitud.find({ userPet: req.uid });

        res.json({
            ok: true,
            solicitud: solicitud

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });
        
    }
}


const modificarSolicitud = async(req, res = express.response) => {

    const solicitudId = req.params.id
    const status = req.body.status

    try {


        const solicitud = await Solicitud.findById(solicitudId);
        if( !solicitud ){
            return res.status(404).json({
                ok: false,
                msg: 'Solicitud no existe con ese id'
            });
        }

        const solicitudCambiada= {
            ...req.body.data,
            status : status
        }

        const solicitudActualizada = await Solicitud.findByIdAndUpdate( solicitudId, solicitudCambiada, {new: true} );


        
        res.json({
            ok: true,
            solicitud: solicitudActualizada

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });
        
    }

}



module.exports = {
    generarSolicitud,
    verSolicitudes,
    modificarSolicitud
    
}

//la idea es primero llenar el usuario y luegop con la mascota
//armar el postman