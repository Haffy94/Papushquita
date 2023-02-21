/* 
    Rutas de Mascotas /solicitude
    host + /api/solicitude
*/
const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { generarSolicitud, verSolicitudes, modificarSolicitud, verUsuarioDeSolicitud, verSolicitudesEnviadas, eliminarSolicitud, modificarSolicitudesRestantes } = require('../controllers/solicitude')

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

//ver solicitudes enviadas
router.get(
    '/sent/view',
    [
        validarJWT
    ], 
    verSolicitudesEnviadas);


//generar solicitudes
router.post(
    '/new',
    [
        validarJWT
    ], 
    generarSolicitud);

//cancelar/borrar solicitud
router.delete(
    '/sent/:id',
    [
            validarJWT,
    ],
    eliminarSolicitud);

//aprobar/rechazar solicitudes
router.put(
    '/modify/:id',
    [
        validarJWT
    ], 
    modificarSolicitud);

//rechazar solicitudes restantes
router.put(
    '/modify/other/:id',
    [
        validarJWT
    ], 
    modificarSolicitudesRestantes);


//ver usuario que envio la solicitud
router.post(
    '/view',
    [
        validarJWT
    ], 
    verUsuarioDeSolicitud);

    


module.exports= router;