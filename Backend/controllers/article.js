'use strict'

var validator = require('validator');//importamos el modulo del validador
var Article = require('../models/article');//importamos el modelo

var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola;       
        
        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Victor Robles',
            url: 'victorroblesweb.es',
            hola
        });
    },

    test: (req, res) =>{
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    },

    save: (req, res) =>{
        //Recoger parámetros por POST
        var params = req.body; //vamos a recoger lo que nos llegue por el body
        //console.log(params);

        //Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);//validate_title dara true cuando params.title no este vacio             
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            return res.status(200).send({                
                message: 'Faltan datos por enviar'
            }); 
        }
        if(validate_title && validate_content){
            //Crear el objeto a guardar

            //Asignar valores al objeto

            //Guardar el artículo

            //Devolver una respuesta

            return res.status(200).send({
                article: params
            });
        }else{
            return res.status(200).send({
                message: 'Los datos no son validos'
            });
        }
        
    }//método save, permitira crear un nuevo articulo
};//end controller 

//utilizamos el module export para poder utilizar este objeto fuera de este archivo y 
//luego utilizar todos estos archivos en las rutas
module.exports = controller;