/* 
    Rutas de Usuarios /events
    host + /api/events
*/
const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getMascotas, publicarMascota, actualizarMascota, eliminarMascota, adoptarMascota, subirImagen } = require('../controllers/pets')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();


// ver mascotas
router.get(
        '/',
        getMascotas);


//publicar una nueva mascota en adopcion
router.post(
        '/',
        [
                validarJWT,
                check('type', 'Por favor especificar el tipo de mascota').not().isEmpty(),
                check('age', 'Por favor especificar la edad de la mascota').not().isEmpty(),
                check('size', 'Por favor especificar el tamaño de la mascota').not().isEmpty(),
                check('address', 'Por favor especificar la direccion donde actualmente se encuentra la mascota').not().isEmpty(),
                validarCampos
        ], 
        publicarMascota);

//subnir imagenes mascota
router.post(
        '/upload', upload.single('image'),
        subirImagen);


//modificar una mascota
router.put(
        '/:id',
        [
                validarJWT,
                validarCampos
        ],
        actualizarMascota);

//borrar una mascota
router.delete(
        '/:id',
        [
                validarJWT,
        ],
        eliminarMascota);

//adoptar una mascota
router.put(
        '/adopt/:id', //id de la mascota
        [
                validarJWT,
        ],
        adoptarMascota);
//devolver una mascota

module.exports= router;


