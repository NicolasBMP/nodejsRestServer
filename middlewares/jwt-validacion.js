const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const User = require('../models/user');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msj: 'No hay token en la petición.'
        });
    }
    try {
        const payload = jwt.verify(token, process.env.JWTKEY);
        const usuario = await User.findById(payload.uid);
        if (!usuario) {
            return res.status(401).json({
                msj: 'Token no válido - Usuario no existe.'
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msj: 'Token no válido - Usuario deshabilitado.'
            });
        }
        req.AU = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msj: 'Token no válido.'
        });
    }
}

module.exports = {
    validarJWT: validarJWT
}
