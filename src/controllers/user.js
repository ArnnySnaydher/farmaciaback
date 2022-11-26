const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {

    //const query = req.query;
  //  const {q, nombre='no name', page = 1,limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    // const query = {estado:true};
/*
    const usuarios = await Usuario.find({ query })
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
*/
    const [total, usuarios] = await Promise.all([

        User.countDocuments(),
        User.find( )
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

const updateUser = async(req = request, res) => {

    const {id} = req.params;
    const { _id, password, email, ...resto} = req.body;

    const user = await User.findById( id )
    
    if (!user){
        return res.status(400).json({
            msg: `La usuario no existe`
        })
    }

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id,resto, {new:true});

    res.json({
        msg: 'Usuario actualizado correactamente',
        usuario
    });
}


// const usuariosPost = async(req, res) => {


//     const {nombre, correo, password, rol} = req.body;
//     const usuario = new Usuario({nombre, correo, password, rol});

//     // Encriptar la contraseña
//     const salt = bcryptjs.genSaltSync(10);
//     usuario.password = bcryptjs.hashSync(password, salt);

//     //Guardar em BD
//     await usuario.save();

//     //const {nombre,edad} = req.body;
//     res.json({
//         usuario
//     });
// }


const getUserById = async(req = request, res=response) => {
    const {id} = req.params;
    const user = await User.findById( id )
        
    if (!user){
        return res.status(400).json({
            msg: `La usuario no existe`
        })
    }
    res.json( user );
}

const deleteUser = async(req = request, res=response) => {
    const {id} = req.params;
    const user = await User.findById( id )
        
    if (!user){
        return res.status(400).json({
            msg: `La usuario no existe`
        })
    }
    const usuario = await User.findByIdAndDelete(id);
    res.json( usuario );
}


// const usuariosPatch = (req, res) => {


//     res.json({
//         msg: 'patch API - controlador'
//     });
// }


module.exports = {
    usuariosGet,
    updateUser,
    getUserById,
    deleteUser,
    // usuariosPost, usuariosPatch
}