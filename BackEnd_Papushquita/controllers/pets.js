const express = require('express');
const Mascota = require('../models/Mascota');

const getMascotas = async(req, res = express.response) => {  //ver mascota, lo vemos despues de el de crear

    const mascota = await Mascota.find()
                                .populate('name');


    res.json({
        ok : true,
        mascota
    })
}


const publicarMascota = async(req, res = express.response) => {

    const mascota = new Mascota( req.body );
    console.log(mascota)
    console.log(req.name)

    
    try {

        mascota.user = req.uid

        const mascotaGuardada = await mascota.save();
        
        res.json({
            ok: true,
            mascota: mascotaGuardada

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });
        
    }


}


const actualizarMascota = async(req, res = express.response) => {

    const mascotaId = req.params.id
    const uid = req.uid
    
    try {

        const mascota = await Mascota.findById(mascotaId);

        if( !mascota ){
            return res.status(404).json({
                ok: false,
                msg: 'Mascota no existe con ese id'
            });
        }

        if (mascota.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'no puede editar esta mascota por que no le pertenece'
            });
        }

        const nuevaMascota= {
            ...req.body,
            user : uid
        }

        const mascotaActualizada = await Mascota.findByIdAndUpdate( mascotaId, nuevaMascota, {new: true} );

        res.json({
            ok : true,
            mascota: mascotaActualizada
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });       
    }
    
}

/*
const eliminarEvento = async(req, res = express.response) => {


    const eventoId = req.params.id
    const uid = req.uid
    
    try {

        const evento = await Evento.findById(eventoId);

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'no puede eliminar este evento por que no le pertenece'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

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
 */

module.exports = {
    getMascotas,
    publicarMascota,
    actualizarMascota
}