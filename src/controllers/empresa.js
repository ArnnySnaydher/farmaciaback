const { response } = require("express");
const Empresa = require("../models/empresa");

// obtenerCategorias - paginado - tottal
const getEmpresa = async(req = request, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;

    // const [total, categorias] = await Promise.all([

    //     Category.countDocuments(),
    //     // Category.find( query ).populate("user")  //populate para obtener los datos del usuario
    //     Category.find( )
    //         .skip(Number(desde))
    //         .limit(Number(limite))
    // ])

    const empresa = await Empresa.find()

    res.json({
        empresa
    });
}
// // //obtenerCategoria - populate {}
// const getCategoriaPorId = async(req = request, res = response) => {

//     const _id = req.params.id;
//     const category = await Category.findById(_id);
//     if (!category) {
//         return res.status(400).json({
//             msg: `La categoria escogida esta fuera de servicio `
//         })
//     }

//     res.json(category);
// }

// // //Crear Category
// const createCategory = async(req, res=response) => {
//     const name = req.body.name.toLowerCase();
    
//     const categoriaDB = await Category.findOne({name});

//     if (categoriaDB) {
//         return res.status(400).json({
//             msg: `La categoria ${categoriaDB.name}, ya existe `
//         })
//     }

//     const data = {
//         name,
//         user: req.uid
//     }
    
//     const category = new Category(data);
//     //Guarda en DB
//     await category.save();

//     res.status(201).json(category);
// }

// // //actualizar Category
// const updateCategory = async(req = request, res) => {

//     const {id} = req.params;
//     const name = req.body.name.toLowerCase();
    
//     if (name === '') {
//         return res.status(400).json({
//             msg: `El nombre es obligatorio `
//         })
//     }

//     const categoriaDB = await Category.findById(id);
//     if (!categoriaDB) {
//         return res.status(400).json({
//             msg: `La categoria escogida esta fuera de servicio `
//         })
//     }
        
//     const category = await Category.findByIdAndUpdate(id, {name}, {new:true});

//     res.json({ msg: 'Producto Actualizado', category });
// }

// // //borrarCategoria- estado:false
// const deleteCategory = async(req = request, res=response) => {
//     const {id} = req.params;
//     const categoriaDB = await Category.findById(id);
//     if (!categoriaDB) {
//         return res.status(400).json({
//             msg: `La categoria seleccionada no existe`
//         })
//     }
//     // const categoria = await Category.findByIdAndUpdate(id, {estado:false},{new:true})
//     const category = await Category.findByIdAndDelete(id, {new:true});
//     res.json({ msg: 'Producto Eliminado', category });
// }


module.exports = {
    getEmpresa,
    // getCategoriaPorId,
    // createCategory,
    // updateCategory,
    // deleteCategory,
}