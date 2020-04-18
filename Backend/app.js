'use strict'
//Cargar modulos de node para crear un servidor
var express = require('express'); //nos permite el servidor....
var bodyParser = require('body-parser'); //cargamos body-parser para convertir a objetos nativo de js (json)

//Ejecutar express (para poder trabajar con http)
var app = express();//express sera la aplicacion en si
//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares (siempre se ejecuta antes de cargar una ruta o url)
app.use(bodyParser.urlencoded({extended:false}));//basicamente cargar el body-parser, utilizarlo
app.use(bodyParser.json());//convertimos toda peticion a json (objeto de js)

//CORS (para permitir peticiones del frontend)
//CORS es acceso cruzado entre dominios, permite llamadas HTTP, peticiones AJAX o llamadas asincronas desde el front end que tengamos en
//otra IP diferente
//middleware que se ejecuta antes de las rutas que tengamos
app.use((req, res, next) => {  //next permite pasar del middleware a lo siguiente que haya que hacer
    res.header('Access-Control-Allow-Origin', '*');//permitir peticiones Ajax
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');//permitir metodos HTTP
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijo a rutas / Cargar rutas
//app.use('/',article_routes);//cargando rutas ya creadas dentro de express
app.use('/api',article_routes);

//Ruta o metodo de prueba para el API REST
/*app.post('/datos-curso', (req, res) => {
    //console.log("Hola Mundo");
    //para recibir pruebas desde el postman
    //vamos a recoger el parametro hola (.hola)
    var hola = req.body.hola;
    var testkey = req.body.testkey;
    
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Victor Robles',
        url: 'victorroblesweb.es',
        hola,
        testkey
    });
});*///la funcion de flecha es lo mismo que poner function()
//app.get('/probando', function(req, res) => {})
//req->lo que recibo
//res->lo que devuelvo

//Exportar modulo (fichero actual, para poder cargar en el index.js)
module.exports = app; //permite usar el objeto creado fuera de este fichero