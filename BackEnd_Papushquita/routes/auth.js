/* 
    Rutas de Usuarios /auth
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const {crearUsuario, loginUsuario, revalidarToken, validarUsuario, editarUsuario, showUser } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = express.Router();


router.post(
        '/', 
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
            validarCampos  
        ],
        loginUsuario);

router.post(
        '/new', 
        [   //middlewares
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('name', 'El nombre de usuario debe tener al menos 6 caracteres').isLength({min: 6}),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
            validarCampos
        ],
        crearUsuario);

router.get(
        '/renew',
        validarJWT,
        revalidarToken);

router.get(
        '/',
        validarJWT,
        showUser);

router.put(
        '/verify', 
        [   
            validarJWT
        ],
        validarUsuario);

router.put(
        '/', 
        [   
            validarJWT
        ],
        editarUsuario);



module.exports= router;