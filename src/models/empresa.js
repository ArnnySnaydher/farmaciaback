const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    name: {
        type: String,
        required : [true, 'El nombre es obligatorio'],
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

EmpresaSchema.methods.toJSON = function(){
    const { __v, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Empresa', EmpresaSchema);