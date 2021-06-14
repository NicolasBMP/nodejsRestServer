const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../middlewares/generar-jwt');

const Login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({
                msj: 'Usuario no existe en la BD.'
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msj: 'El usuario esta inhabilitado.'
            });
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msj: 'Usuario y/o constraseña incorrectos.'
            });
        }
        const token = await generarJWT(usuario.id);
        res.json({
            msj: 'Login OK',
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: '500 - Error interno'
        });
    }
}

module.exports = {
    Login: Login
}
