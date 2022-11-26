const { Schema, model } = require('mongoose');

const productSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    laboratorio: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    vencimiento: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    // categoria: {
    //     type: String,
    //     required: true
    // }
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

module.exports = model('Product', productSchema);