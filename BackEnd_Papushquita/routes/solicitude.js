/* 
    Rutas de Mascotas /solicitude
    host + /api/solicitude
*/
const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { generarSolicitud, verSolicitudes, modificarSolicitud } = require('../controllers/solicitude')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();




//ver solicitudes
router.get(
    '/view',
    [
        validarJWT
    ], 
    verSolicitudes);


//generar solicitudes
router.post(
    '/new',
    [
        validarJWT
    ], 
    generarSolicitud);

//cancelar solicitud

//aprobar/denegar/rechazar solicitudes
router.put(
    '/modify/:id',
    [
        validarJWT
    ], 
    modificarSolicitud);

    


module.exports= router;