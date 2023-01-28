const express = require('express');
const Mascota = require('../models/Mascota');
const Usuario = require('../models/Usuario');
const Solicitud = require('../models/Solicitud');


const generarSolicitud = async(req, res = express.response) => {

    const solicitud = new Solicitud( req.body );

    try {

        solicitud.user = req.uid
        

        const nuevaSolicitud = await solicitud.save();

        
        res.json({
            ok: true,
            mascota: nuevaSolicitud

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });
        
    }




}

//la idea es primero llenar el usuario y luegop con la mascota
//armar el postman