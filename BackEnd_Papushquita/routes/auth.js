/* 
    Rutas de Usuarios /auth
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const {crearUsuario, loginUsuario, revalidarToken, validarUsuario, editarUsuario } = require('../controllers/auth');
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
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
            validarCampos
        ],
        crearUsuario);

router.get(
        '/renew',
        validarJWT,
        revalidarToken);

router.put(
        '/verify', 
        [   
            check('dni', 'El dni es obligatorio').not().isEmpty(),
            check('contactPhone', 'El numero de contacto es obligatorio').not().isEmpty(),
            check('address', 'La direccion es obligatoria').not().isEmpty(),
            check('houseType', 'El campo es obligatorio').not().isEmpty(),
            check('houseType2', 'El campo es obligatorio').not().isEmpty(),
            check('familymembers', 'La cantidad de familiares es obligatoria').not().isEmpty(),
            check('otherAnimalsCastration', 'El campo es obligatorio').not().isEmpty(),
            check('experienceWhitOtherPets', 'El campo es obligatorio').not().isEmpty(),
            check('windowsProtect', 'El campo es obligatorio').not().isEmpty(),
            validarCampos,
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