/* 
    Rutas de Mascotas /solicitude
    host + /api/solicitude
*/
const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { generarSolicitud } = require('../controllers/solicitude')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();




//ver solicitudes

//generar solicitudes
router.post(
    '/new', 
    generarSolicitud);

//cancelar solicitud

//aprobar/denegar/rechazar solicitudes


module.exports= router;