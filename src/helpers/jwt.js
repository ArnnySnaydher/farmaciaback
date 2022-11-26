const jwt = require("jsonwebtoken")

// Generar el token que expira en 24h
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el JWT')
            } else {
                resolve(token)
            }
        })
    })
}

// Verificar que el token sea valido y ver a quien le pertenece mediante su uid
const verifyJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY)
        return [true, uid]
    } catch (error) {
        return [false, null]
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}