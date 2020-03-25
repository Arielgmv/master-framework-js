'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//utilizamos el objeto de este tipo Schema

var ArticleSchema = Schema({
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String
});//definimos la estructura de los objetos y documentos

module.exports = mongoose.model('Article', ArticleSchema);
//mongo guarda de la siguiente manera:
//articles --> guarda documentos de este tipo y con estructura dentro de la coleccion
