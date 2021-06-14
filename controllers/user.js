const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const GetUser = async (req, res = response) => {
    const { limit = 15, from = 0 } = req.query;
    const query = { estado: true };
    const usuarios = await User.find(query).skip(Number(from)).limit(Number(limit));
    //AUX
    /* const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(limit))
    ]); */
    res.json({
        size: usuarios.length,
        usuarios: usuarios
    });
}

const InsertUser = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    return res.json({
        msj: 'POST - From controller'
    });
}

const DeletetUser = async (req, res = response) => {
    const { id } = req.params;
    //const AU = req.AU;
    //Fisicamente
    //const user = await User.findByIdAndDelete(id);
    //Actualizar estado
    const user = await User.findByIdAndUpdate(id, { estado: false });
    res.json({
        msj: 'DELETE - From controller',
        user
    });
}

const UpdatetUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, google, email, ...rest } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.json({
        msj: 'PUT - From controller',
        user
    });
}

module.exports = {
    GetUser: GetUser,
    InsertUser: InsertUser,
    DeletetUser: DeletetUser,
    UpdatetUser: UpdatetUser
}
