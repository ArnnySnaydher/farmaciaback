const { Router } = require('express');
const { check } = require('express-validator');
const { getCategoria, createCategory, getCategoriaPorId, updateCategory, deleteCategory } = require('../controllers/category');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
// const { validarJWT, tieneRole } = require('../middlewares');

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre de la categoria
 *      required:
 *        - name
 */
const router = Router();

/**
 * @swagger
 * /api/category:
 *  get:
 *   summary: Return all categories
 *   tags: [Category]
 *   parameters:
 *    - in: query
 *      name: limite
 *    - in: query
 *      name: desde
 *   responses:
 *     200:
 *      description: Categories founded
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Category'
 */
router.get('/',getCategoria);

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *   summary: Return a category by id
 *   tags: [Category]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The category id
 *   responses:
 *     200:
 *      description: The category was successfully founded
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Category'
 *     404:
 *      description: The product was not found
 */
router.get('/:id',[
    check('id', 'No es un ID mongo valido').isMongoId(),
    validateFields,
],getCategoriaPorId);

/**
 * @swagger
 * /api/category:
 *  post:
 *   summary: Create a new category
 *   tags: [Category]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Category'
 *   responses:
 *     200:
 *      description: The product was successfully created
 */
router.post('/',[
    validateJWT,
    check('name','EL nombre es obligatorio').not().isEmpty(),
    validateFields,
],createCategory);

/**
 * @swagger
 * /api/category/{id}:
 *  put:
 *   summary: Update a category by id
 *   tags: [Category]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The category id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Category'
 *   responses:
 *     200:
 *      description: The category was successfully updated
 *     404:
 *      description: The category was not found
 */
router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validateFields]
, updateCategory);

//borrar una categoria - Admin
/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *   summary: delete a category
 *   tags: [Category]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The category id
 *   responses:
 *     200:
 *      description: The category was successfully deleted
 *     404:
 *      description: The category was not found
 */
router.delete('/:id',[
    validateJWT,
    // tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    validateFields
],deleteCategory);


module.exports = router;