const {Schema, model} = require('mongoose');

const EventoSchema = Schema({

    type: {                 //gato o perro
        type: String,
        required: true
    },
    name: {
        type: String
    },
    breed : {               //mestizo o si es de alguna raza
        type: String
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    size: {                 //chico, mediano, grande
        type: String,
        required: true
    },
    address: {              //si la dirrecion de la  mascota es distinta de el usuario adoptante
        type: String,
        required: true
    },
    notes: {              
        type: String
    },
    image: {              
        type: String
    },
    inAdoption: {              
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
})

module.exports = model('Mascota', EventoSchema);

