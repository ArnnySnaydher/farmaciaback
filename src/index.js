const express = require('express')
const cors = require('cors')
const bcryptjs = require("bcryptjs")
const User = require('./models/user');
const Empresa = require('./models/empresa');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path')

// swagger part
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Farmacia UntelsFarma Testing',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:9000',
            },
            {
                url: 'https://backend-testing-production.up.railway.app',
            },
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}

// settings
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(cors())
app.use( express.json());
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

// Rutas
app.use('/api/products', require('./routes/product'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/category', require('./routes/category'));
app.use('/api/empresa', require('./routes/empresa'));

// routes
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API')
})

// mongodb conection
mongoose.connect( process.env.MONGODB_URI )
.then( async () => {

    const existEmpresa = await Empresa.findOne({name : "farmacel"})
    if (!existEmpresa) {
        const dataEmpresa = {
            name: "farmacel"
        }
        const empresa = await Empresa(dataEmpresa);
        empresa.save()
    }

    const existUser = await User.findOne({email: "superAdmin@gmail.com"}) 
     if (!existUser) {
         console.log('Conectado a MongoDB Atlas')
         const data = {
             name: "superAdmin",
             lastname: "superAdmin",
             email: "superAdmin@gmail.com",
             online: false,
             role: "superAdmin",
         };
         const user = new User(data)
     
         // Encriptar contraseña
         const salt = bcryptjs.genSaltSync()
         user.password = bcryptjs.hashSync("123456", salt)
     
         // Guardar usuario en DB
         await user.save()
     }

})
.catch( err => console.error(err));

app.listen( port, () => console.log(`Servidor escuchando en puerto: ${port}, http://localhost:${port}/`));