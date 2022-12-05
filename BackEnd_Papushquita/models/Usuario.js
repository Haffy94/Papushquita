const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerify: {
        type: Boolean
    },
    dni: {
        type: String
    },
    contactPhone: {
        type: Number
    },
    address: {
        type: String
    },
    houseType: {
        type: String,           //casa, departamento
        
    },
    houseType2: {
        type: String,           //propietario, inquilino
        
    },
    familymembers: {
        type: Number,          //cantidad de familiares
        
    },
    otherAnimalsCastration: {
        type: String,           // Si, todo estan castrados - algunos SI otros NO - No castre aun pero lo voy a hacer - No estan Castrados - No tengo Otros animales
        
    },
    experienceWhitOtherPets: {
        type: String,           //si - no
        
    },
    windowsProtect: {
        type: String,           //si - no
        
    }
});

module.exports = model('Usuario', UsuarioSchema);

