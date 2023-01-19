require('dotenv').config();
const express = require('express');
const path = require('path')
const hbs = require('hbs');
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo');
const clientDB = require('./database/db')
const mongoSanitize = require('express-mongo-sanitize');
const flash = require('connect-flash')
const passport = require('passport');
const { initialize } = require('passport');
const User = require('./models/User');
const csrf = require('csurf');
const cors = require('cors')


const PORT = process.env.PORT || 3000;

//Configuración Cors
const corsOptions = {
    credentials: true,
    origin: process.env.pathHeroku || "*",
    methods: ['GET', 'POST']
}
app.use(cors())


//Hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//Sesiones configuracion
app.use(session ({
    secret: process.env.secretSession,
    resave: false,
    saveUninitialized: false,
    name: "secret-name-aoaoao",
    store: MongoStore.create({
        clientPromise: clientDB,
        dbName: process.env.dbName,
    }),
    //Para produccion poner-> secure: false
    cookie: {secure: process.env.modo === 'production', maxAge: 30 * 24 * 60 *60 * 1000}
}))

//Passport configuracion
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => 
    done(null, {id: user._id, email: user.email}));

passport.deserializeUser( async (user, done)=>{
    const userDB = await User.findById(user.id)
    return done(null, {id: userDB._id, email: userDB.email, nombre:userDB.nombre})
})


//Middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(csrf())
app.use(express.json());
app.use(flash())

//Configuración Csrf
app.use((req, res, next)=>{
    res.locals.csrfToken = req.csrfToken()
    res.locals.mensajes = req.flash("mensajes")
    next()
})

app.use(mongoSanitize());



//Rutas
app.use('/', require('./routes/home'))
app.use('/datosPersonales', require('./routes/datosPersonales'))
app.use('/verMisDatos', require('./routes/verMisDatos'))
app.use('/auth', require('./routes/auth'))
app.use('/datosPerfil', require('./routes/datosPerfil'))
app.use('/datosDescripcion', require('./routes/datosDescripcion'))
app.use('/datosLaborales', require('./routes/datosLaborales'))
app.use('/elegirPlantilla', require('./routes/elegirPlantilla'))
app.use('/pages', require('./routes/pages'))
app.use('/verificarDatos', require('./routes/verificarDatos'))


app.listen(PORT, ()=>
console.log("Aplicación corriendo en el puerto: "+PORT+" 🚀"))

app.on('Error', (err) => {
    console.log(`Tenemos un error en el Espacio`);
})