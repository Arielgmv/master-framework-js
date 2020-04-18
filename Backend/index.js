'use strict'
var mongoose = require('mongoose');
var app = require('./app');//como lo hemos creado manualmente, es un archivo, no esta en nodemodule
var port = 3900;

//desactivar la forma de trabajo antigua, forzar que los métodos antiguos se desactiven
mongoose.set('useFindAndModify', false);
//promesa para evitar ciertos fallos en la conexión u otros
mongoose.Promise = global.Promise;
//configuración para la conexión a la BBDD
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
        .then(()=>{
            console.log('Test de conexión a la base de datos se ha realizado correctamente');

            //crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => { //metodo listen, dos parametros: puerto y una funcion de callback
                console.log('Servidor corriendo en http://localhost:'+port);
            });
});