const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    validRole: validRole,
    validEmail: validEmail,
    validUser: validUser
}
