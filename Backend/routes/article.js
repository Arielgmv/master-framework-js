'use strict'
//Ejecutar express (para poder trabajar con http)
var express = require('express');
var ArticleController = require('../controllers/article')//cargamos el controlador

var router = express.Router();//llamamos al router de express

var multipart = require('connect-multiparty');//cargamos el modulo de connect-multiparty
var md_upload = multipart({uploadDir: './upload/articles'});//connect-multiparty nos da un middleware, una funcionalidad que se ejecuta antes del
//metodo en el controlador, guardo los archivos en la carpeta upload/articles

//Rutas de pruebas
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);//creo una ruta por get

//Rutas útiles
//* GET para sacar datos de la BBDD
//* POST para guardar o enviar datos a la BBDD o al backend
//* PUT para actualizar
//* DELETE para borrar
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);//? parámetro opcional por la URL
router.get('/article/:id', ArticleController.getArticle);//sin ?, obligatorio el campo
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);

//exporto el modulo para poder usarlo
module.exports = router;
