const express = require('express');
const Mascota = require('../models/Mascota');
const Usuario = require('../models/Usuario');

const getMascotas = async(req, res = express.response) => { 

    const mascota = await Mascota.find({ inAdoption: true });

    res.json({
        ok : true,
        mascota
    })
}

const getMisMascotas = async(req, res = express.response) => { 

    const userId = req.uid;  
    const mascota = await Mascota.find({ user: userId });

    res.json({
        ok : true,
        mascota
    })
}


const publicarMascota = async(req, res = express.response) => {

    const mascota = new Mascota( req.body );


    
    try {

        mascota.user = req.uid
        mascota.inAdoption = true
        

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
            ...req.body.data,
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


const eliminarMascota = async(req, res = express.response) => {


    const mascotaId = req.params.id
    const uid = req.uid
    
    try {

        const mascota = await Mascota.findById(mascotaId);

        if( !mascota ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (mascota.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'no puede eliminar esta mascota por que no le pertenece'
            });
        }

        await Mascota.findByIdAndDelete( mascotaId );

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


const adoptarMascota = async(req, res = express.response) => {

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

        if (mascota.user.toString() === uid){
            return res.status(401).json({
                ok: false,
                msg: 'no puede adoptar su propia mascota'
            });
        }

        const usuario = await Usuario.findById(uid);

        if( !usuario.isVerify ){
            return res.status(401).json({
                ok: false,
                msg: 'deber verificar su usuario primero!'
            });
        }

        const adopcionMascota= {
            ...req.body,
            user : uid,
            inAdoption : false
        }

        const mascotaAdoptada = await Mascota.findByIdAndUpdate( mascotaId, adopcionMascota, {new: true} );

        res.json({
            ok : true,
            mascota: mascotaAdoptada
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });       
    }
    
}


const subirImagen = async(req, res) => {

        const mascotaId = req.body.id;
        const uid = req.body.user;

        const petImageUrl = req.file.path;


        const nuevaMascota= {
            ...req.body,
            user : uid,
            image : req.file.path
        }

        const mascotaActualizada = await Mascota.findByIdAndUpdate( mascotaId, nuevaMascota, {new: true} );

        res.json({
            ok : true,
            mascota: mascotaActualizada
        });



}



module.exports = {
    getMascotas,
    publicarMascota,
    actualizarMascota,
    eliminarMascota,
    adoptarMascota,
    subirImagen,
    getMisMascotas,
    
}