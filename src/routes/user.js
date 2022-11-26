const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, updateUser, getUserById, deleteUser } = require('../controllers/user');


const router = Router();


router.get('/',  usuariosGet);


router.put('/:id',  updateUser);

router.get('/:id',  getUserById);


router.delete('/:id',  deleteUser);



module.exports = router;
