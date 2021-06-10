const { response, request } = require('express');

const GetUser = (req, res = response) => {
    res.json({
        'msj': 'GET - From controller'
    });
}

const InsertUser = (req = request, res = response) => {
    console.log(req.body);
    res.json({
        'msj': 'POST - From controller'
    });
}

const DeletetUser = (req, res = response) => {
    res.json({
        'msj': 'DELETE - From controller'
    });
}

const UpdatetUser = (req = request, res = response) => {
    console.log(req.params);
    console.log(req.query);
    res.json({
        'msj': 'PUT - From controller'
    });
}

module.exports = {
    GetUser: GetUser,
    InsertUser: InsertUser,
    DeletetUser: DeletetUser,
    UpdatetUser: UpdatetUser
}
