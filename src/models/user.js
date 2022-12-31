const { Schema, model, models } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
        // required: [true, 'El nombre es obligatorio']
    },
    lastname: {
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
    online: {
        type: Boolean,
        default: false
    },
    empresa: {
        type: String,
        default: "medical"
    },
    role: {
        type: String,
        enum: ['superAdmin','admin', 'client'],
        default: 'client'
    },
})

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

// module.exports = models.User || model('User', UserSchema);
module.exports = model('User', UserSchema);