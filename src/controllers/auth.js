const { response } = require("express")
const bcryptjs = require("bcryptjs")
const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt")

const createUser = async(req, res = response) => {
    try {
        const { email, password } = req.body
        const existEmail = await User.findOne({ email })
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const user = new User(req.body)

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)

        // Guardar usuario en DB
        await user.save()

        // Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const login = async(req, res = response) => {
    const { email, password } = req.body

    try {
        // Verificar si existe el correo
        const userDB = await User.findOne({ email })
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Email ingresado no existe'
            })
        }

        // Validar el password
        const validPassword = bcryptjs.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar el JWT
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            user: userDB,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid

    // Generar el JWT
    const token = await generateJWT(uid)

    // Obtener el usuario por UID
    const user = await User.findById(uid)

    res.json({
        ok: true,
        user,
        token,
    })
}

module.exports = {
    createUser,
    login,
    renewToken
}