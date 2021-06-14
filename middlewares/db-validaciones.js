const Role = require('../models/role');
const User = require('../models/user');
const { response, request } = require('express');

const validRole = async (role = '') => {
    const existerol = await Role.findOne({ rol: role });
    if (!existerol) {
        throw new Error(`No existe el rol: ${role} en la BD.`);
    }
}

const validEmail = async (email = '') => {
    const existsemail = await User.findOne({ email: email });
    if (existsemail) {
        throw new Error(`El correo: ${email} ya existe en la BD.`);
    }
}

const validUser = async (id) => {
    const existeusuario = await User.findById(id);
    if (!existeusuario) {
        throw new Error(`No existe el usuario con el ID: ${id} en la BD.`);
    }
}

const validAdminRole = (req = request, res = response, next) => {
    console.log(req.AU);
    if (!req.AU) {
        return res.status(500).json({
            msj: 'No existe el usuario autenticado con el token.'
        });
    }
    else {
        const { role, name } = req.AU;
        if (role != 'ADMIN_ROLE') {
            return res.status(401).json({
                msj: `${name} no es un administrador.`
            });
        }
    }
    next();
}

module.exports = {
    validRole: validRole,
    validEmail: validEmail,
    validUser: validUser,
    validAdminRole: validAdminRole
}
