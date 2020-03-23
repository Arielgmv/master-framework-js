'use strict'
var mongoose = require('mongoose');

//desactivar la forma de trabajo antigua, forzar que los métodos antiguos se desactiven
mongoose.set('useFindAndModify', false);
//promesa para evitar ciertos fallos en al conexión u otros
mongoose.Promise = global.Promise;
//configuración para la conexión a la BBDD
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
        .then(()=>{
            console.log('Test conexión a la base de datos se ha realizado correctamente')
});