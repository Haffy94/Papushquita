const {Schema, model} = require('mongoose');

const EventoSchema = Schema({

    status: {                 //gato o perro
        type: String,
        required: true
    },
    message: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    userName: {
        type: Schema.Types.Object,
        ref: 'Usuario',
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota',
        required: true
    },
    petName: {
        type: Schema.Types.Object,
        ref: 'Mascota',
        required: true
    },
    petAddress: {
        type: Schema.Types.Object,
        ref: 'Mascota',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userPet: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    date: {
        type: Date,
        required: true
    }


});

EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
})

module.exports = model('Solicitud', EventoSchema);
