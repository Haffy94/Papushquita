/* 
    Rutas de Usuarios /events
    host + /api/events
*/
const express = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getMascotas, publicarMascota, actualizarMascota } = require('../controllers/pets')

const router = express.Router();
//todas tienen que estar validadas por jwt
router.use( validarJWT );

// ver mascotas
router.get(
        '/',
        getMascotas);


//publicar una nueva mascota en adopcion
router.post(
        '/',
        [
               /* check('title', 'el titulo es obligatorio').not().isEmpty(),
                check('start', 'fecha de inicio es obligatoria').custom( isDate ),
                check('end', 'fecha de finalizacion es obligatoria').custom( isDate ),
                validarCampos */
        ], 
        publicarMascota);


//modificar una mascota
router.put(
        '/:id',
        [
                /* check('title', 'el titulo es obligatorio').not().isEmpty(),
                check('start', 'fecha de inicio es obligatoria').custom( isDate ),
                check('end', 'fecha de finalizacion es obligatoria').custom( isDate ),
                validarCampos */
        ],
        actualizarMascota);

//borrar una mascota
// router.delete(
//         '/:id',
//         eliminarEvento);

//adoptar una mascota
//devolver una mascota

module.exports= router;


