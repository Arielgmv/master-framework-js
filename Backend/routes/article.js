'use strict'
//Ejecutar express (para poder trabajar con http)
var express = require('express');
var ArticleController = require('../controllers/article')//cargamos el controlador

var router = express.Router();//llamamos al router de express

//Rutas de pruebas
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);//creo una ruta por get

//Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);//? parámetro opcional por la URL

//exporto el modulo para poder usarlo
module.exports = router;
