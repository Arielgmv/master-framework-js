'use strict'
//Cargar modulos de node para crear un servidor
var express = require('express'); //nos permite el servidor....
var bodyParser = require('body-parser'); //cargamos body-parser para convertir a objetos nativo de js (json)

//Ejecutar express (para poder trabajar con http)
var app = express();//express sera la aplicacion en si
//Cargar ficheros rutas

//Middlewares (siempre se ejecuta antes de cargar una ruta o url)
app.use(bodyParser.urlencoded({extended:false}));//basicamente cargar el body-parser, utilizarlo
app.use(bodyParser.json());//convertimos toda peticion a json (objeto de js)

//CORS (para permitir peticiones del frontend)

//Añadir prefijo a rutas

//Ruta o metodo de prueba para el API REST
app.get('/probando', function(req, res){
    console.log("Hola Mundo");
});//la funcion de flecha es lo mismo que poner function()
//app.get('/probando', () => {})
//req->lo que recibo
//res->lo que devuelvo

//Exportar modulo (fichero actual, para poder cargar en el index.js)
module.exports = app; //permite usar el objeto creado fuera de este fichero