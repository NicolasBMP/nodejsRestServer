const { Router } = require('express');
const { GetUser, InsertUser, DeletetUser, UpdatetUser } = require('../controllers/user');

const router = Router();

router.get('/', GetUser);

router.post('/', InsertUser);

router.delete('/', DeletetUser);

router.put('/:id', UpdatetUser);

module.exports = router;
