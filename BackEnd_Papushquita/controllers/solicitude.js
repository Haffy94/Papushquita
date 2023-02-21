const express = require('express');
const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');
const Solicitud = require('../models/Solicitud');


const generarSolicitud = async(req, res = express.response) => {

    const solicitud = new Solicitud(req.body.data);

    try {

        const solicitudRepetida = await Solicitud.findOne({user: req.uid, pet: req.body.data.id } );
        console.log(solicitudRepetida)

        if ( solicitudRepetida !== null ){
            return res.json({
                ok: false,
                msg: 'Usted ya envio una solicitud a esta mascota'
            });
        }
        

        solicitud.user = req.uid
        solicitud.userName = req.name

        solicitud.pet = req.body.data.id
        solicitud.userPet = req.body.data.user
        solicitud.petName = req.body.data.name
        solicitud.petImage = req.body.data.image
        solicitud.petAddress = req.body.data.address

        solicitud.date = Date()
        solicitud.status = "Pendiente"


        const mascota = await Mascota.findById(solicitud.pet);

        console.log(mascota.inAdoption)

        if(!mascota.inAdoption){
            return res.json({
                ok: false,
                msg: 'Esta mascota ya fue adoptada! refresque la pagina'
            });
        }

        if(solicitud.user.toString() === solicitud.userPet.toString()){
            return res.json({
                ok: false,
                msg: 'No puede adoptar su propia mascota!'
            });
        }
        
        
        

        const nuevaSolicitud = await solicitud.save();

        
        res.json({
            ok: true,
            solicitud: nuevaSolicitud

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error
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

const verSolicitudesEnviadas = async(req, res = express.response) => {
    try {
        const solicitud = await Solicitud.find({ user: req.uid });

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
    const status = req.body

    try {


        const solicitudCambiada= {
            ...req.body.data,
            status : status.status
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

const verUsuarioDeSolicitud = async(req, res = express.response) => {

    const usuario = await Usuario.findById(req.body.user);


    res.json({
        usuario
    })
}


const eliminarSolicitud = async(req, res = express.response) => {

    const solicitudId = req.params.id

    
     try {

        await Solicitud.findByIdAndDelete( solicitudId );

        res.json({
            ok : true
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });       
    } 

}

const modificarSolicitudesRestantes = async(req, res = express.response) => {

    const petId = req.params.id
    const solicitudId = req.body.solicitudId


    try {


        const solicitudes = await Solicitud.find({ pet: petId });

        solicitudes.forEach( async(solicitud) => {
            if(solicitud.id !== solicitudId){
                const solicitudCambiada= {
                    status : 'Rechazado'
                }
                await Solicitud.findByIdAndUpdate( solicitud.id, solicitudCambiada, {new: true} );
            }else{
                const solicitudCambiada= {
                    status : 'Retirado!'
                }
    
                await Solicitud.findByIdAndUpdate( solicitud.id, solicitudCambiada, {new: true} );
            }


           

            

         });


        
        
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
    modificarSolicitud,
    verUsuarioDeSolicitud,
    verSolicitudesEnviadas,
    eliminarSolicitud,
    modificarSolicitudesRestantes
    
}

//la idea es primero llenar el usuario y luegop con la mascota
//armar el postman