const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = express.response) => {

    
    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok:false,
                msg: 'Ya existe un usuario con este correo'
            })
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar jwt
        //const token = await generarJWT(usuario.id, usuario.name);

        
        res.status(201).json({
            ok : true,
            uid: usuario.id,
            name: usuario.name,
            //token
        })
            
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }
    
    
}

const loginUsuario = async(req, res = express.response) => {

    const { email, password } = req.body 

    try {
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok:false,
                msg: 'Email inválido'
            });
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //generar nuestro json web token
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
        
    }
    
}

const revalidarToken = async(req, res = express.response) => {

    const {uid, name} = req;

    //generar nuevo jwt 
    const token = await generarJWT(uid, name);

    res.json({
        ok : true,
        uid,
        name,
        token: token
    })
}


const showUser = async(req, res = express.response) => {

    const { uid } = req;

    const usuario = await Usuario.findById(uid);


    res.json({
        usuario
    })
}



const validarUsuario = async(req, res = express.response) => {
    
    const userId = req.uid
    try {

        const usuario = await Usuario.findById(userId);

        if( !usuario ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este ID'
            });
        }


        const verificarUsuario= {
            ...req.body.data,
            user : userId,
            isVerify : true
        }

        const usuarioVerificado = await Usuario.findByIdAndUpdate( userId, verificarUsuario, {new: true} );

        res.json({
            ok : true,
            usuario: usuarioVerificado
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });       
    }
    
    
}

const cambiarContraseña = async(req, res = express.response) => {
    const userId = req.uid
    try {
        const usuario = await Usuario.findById(userId);
        const validPassword = bcrypt.compareSync( req.body.data.password, usuario.password )


        if( !validPassword ){
            const salt = bcrypt.genSaltSync();
            req.body.data.password = bcrypt.hashSync(req.body.data.password, salt);
        }


        const cambioContraseña= {
            ...req.body.data
        }

        const contraseñaCambiada = await Usuario.findByIdAndUpdate( userId, cambioContraseña, {new: true} );

        res.json({
            ok : true,
            usuario: contraseñaCambiada
        });
        
    } catch (error) {
        
    }
    



}

const verificarValidacion = async(req, res = express.response) => {
    
    const userId = req.uid

    try {

        const usuario = await Usuario.findById(userId);
        if ( usuario.isVerify ){
            res.json({
                status : true
    
            });
        }else{
            res.json({
                status : false
    
            });
        }
    



        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        });       
    }
    
    
}




const editarUsuario = async(req, res = express.response) => {
    
    const userId = req.uid

    try {

        const usuario = await Usuario.findById(userId);

        if( !usuario ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este ID'
            });
        }


        const editarUsuario= {
            ...req.body,
            user : userId
        }

        const usuarioEditado = await Usuario.findByIdAndUpdate( userId, editarUsuario, {new: true} );

        res.json({
            ok : true,
            usuario: usuarioEditado
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
    crearUsuario,
    loginUsuario,
    revalidarToken,
    validarUsuario,
    editarUsuario,
    showUser,
    verificarValidacion,
    cambiarContraseña
}