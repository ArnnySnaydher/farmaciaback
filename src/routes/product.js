/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre del producto
 *        precio:
 *          type: number
 *          description: Precio del producto
 *        descripcion:
 *          type: string
 *          description: Descripcion del producto
 *        laboratorio:
 *          type: string
 *          description: Laboratorio del producto
 *        stock:
 *          type: number
 *          description: Stock del producto
 *        vencimiento:
 *          type: string
 *          description: Vencimiento del producto
 *        imagen:
 *          type: string
 *          description: Imagen del producto
 *        categoria:
 *          type: string
 *          description: Categoria del producto
 *      required:
 *        - nombre
 *        - precio
 *        - descripcion
 *        - laboratorio
 *        - stock
 *        - vencimiento
 *        - imagen
 *        - categoria
 */

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const Category = require('../models/category');
const productSchema = require('../models/product');
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *  post:
 *   summary: Create a new product
 *   tags: [Product]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *      description: The product was successfully created
 */
router.post('/', 
    [ 
        check('categoria', 'La categoria es requerida').not().isEmpty(),
        check('categoria', 'No es un id de categoria valido').isMongoId(),
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('precio', 'El precio es requerido').not().isEmpty(),
        check('descripcion', 'El descripcion es requerido').not().isEmpty(),
        check('laboratorio', 'El laboratorio es requerido').not().isEmpty(),
        check('stock', 'El stock es requerido').not().isEmpty(),
        check('vencimiento', 'La fecha de vencimiento es requerido').not().isEmpty(),
        check('imagen', 'El imagen es requerido').not().isEmpty(),
        validateFields
    ]
    , async(req, res) => {
    const {categoria, nombre} = req.body
    const idcategoria = await Category.findById(categoria);
    
    if (!idcategoria){
        return res.status(400).json({
            msg: `La categoria del producto escogido no existe`
        })
    }

    const productoDB = await productSchema.findOne({nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe `
        })
    }

    const product = productSchema( req.body );
    await product.save();

    res.status(201).json(product);
})

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Return all products
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: search
 *   responses:
 *     200:
 *      description: Products founded
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Product'
 */
router.get('/', async(req, res) => {
    const { search } = req.query
    const regex = new RegExp(search,'i')
    // productSchema
    //     .find({
    //         // $or: [{nombre: regex}, {categoria: regex}],
    //         $or: [{nombre: regex}],
    //     })
    //     // .select('nombre precio -_id')
    //     // .lean()
    //     .then(( data ) => res.json( data ))
    //     .catch(( error ) => res.json({ message: error }));

        const products = await productSchema.find({
            $or: [{nombre: regex}],
        })
    .populate("categoria",'name')  
    .select('-__v')
    res.json({
        products
    });
})

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Return a product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   responses:
 *     200:
 *      description: The product was successfully founded
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *     404:
 *      description: The product was not found
 */
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const product = await productSchema.findById( id )
    .populate("categoria",'name')  
    if (!product){
        return res.status(400).json({
            msg: `La producto no existe`
        })
    }
    res.json({
        product
    });
        // .then(( data ) => res.json( data ))
        // .catch(( error ) => res.json({ msg: 'No existe el producto' }));
})

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Update a product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *      description: The product was successfully updated
 *     404:
 *      description: The product was not found
 */
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { nombre,
            precio,
            descripcion,
            laboratorio,
            stock,
            vencimiento,
            imagen,
            categoria } = req.body;

    const idcategoria = categoria ? await Category.findById(categoria) : true
    
    if (!idcategoria){
        return res.status(400).json({
            msg: `La categoria del producto escogido no existe`
        })
    }

    const productoDB = await productSchema.findOne({nombre});

    if (productoDB && productoDB.nombre !== nombre) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe `
        })
    }

    const productoUpdated = await productSchema.findByIdAndUpdate(id, req.body, {new:true})
    res.json({
        producto: productoUpdated
    });
})

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: delete a product
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   responses:
 *     200:
 *      description: The product was successfully deleted
 *     404:
 *      description: The product was not found
 */
router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    const product = await productSchema.findById(id);

    if (!product ) {
        return res.status(400).json({
            msg: `El producto ${id} no existe`
        })
    }
    
    productSchema
        .remove({ _id : id })
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

module.exports = router;
