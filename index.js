import express from 'express'
import router from './routes/index.js';
import db from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.DATABASE);

const app = express()

//conectar la base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada'))
    .catch(error => console.log(error))

//definir puerto
const port = process.env.port || 4000;

//habilitar pug
app.set('view engine', 'pug')

//obtener el año actual
app.use((req, res, next) =>{
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = "Agencia de Viajes"
    return next();
});

//agregar body parcer para leer los datos del formulario
app.use(express.urlencoded({extended:true}))

//definir la carpeta publica
app.use(express.static('public'))

//agregar router
app.use('/', router)

app.listen(port, () => {
    console.log(`el servidor esta funcionando en el puerto ${port}`);
})