const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresa } = require('../controllers/empresa');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
// const { validarJWT, tieneRole } = require('../middlewares');

const router = Router();

router.get('/',getEmpresa);

// router.get('/:id',[
//     check('id', 'No es un ID mongo valido').isMongoId(),
//     validateFields,
// ],getCategoriaPorId);

// router.post('/',[
//     validateJWT,
//     check('name','EL nombre es obligatorio').not().isEmpty(),
//     validateFields,
// ],createCategory);

// router.put('/:id',[
//     validateJWT,
//     check('id', 'No es un ID valido').isMongoId(),
//     validateFields]
// , updateCategory);


// router.delete('/:id',[
//     validateJWT,
//     // tieneRole('ADMIN_ROLE'),
//     check('id', 'No es un ID valido').isMongoId(),
//     validateFields
// ],deleteCategory);


module.exports = router;