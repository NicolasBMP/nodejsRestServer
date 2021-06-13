const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    email: {
        type: String,
        required: [true, 'Correo obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Rol obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function () {
    const { __v, password, ...rest } = this.toObject();
    return rest;
}

module.exports = model('User', userSchema);
