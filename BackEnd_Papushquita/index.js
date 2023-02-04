const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('./database/config');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


//Crear el Servidor de Express
const app = express();

//base de datos
dbConection();

//CORS
app.use(cors())


//Directorio Publico
app.use( express.static('public') );
app.use( '/uploads', express.static('uploads') );

//lectura y parseo de el body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/solicitude', require('./routes/solicitude'));



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor Corriendo en puerto ${ process.env.PORT }`)
})