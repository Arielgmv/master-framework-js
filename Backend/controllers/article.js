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

    save: (req, res) =>{ //método save, permitira crear un nuevo articulo
        //Recoger parámetros por POST
        var params = req.body; //vamos a recoger lo que nos llegue por el body
        //console.log(params);

        //Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);//validate_title dara true cuando params.title no este vacio             
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            return res.status(200).send({  
                status: 'error', 
                message: 'Faltan datos por enviar'
            }); 
        }
        if(validate_title && validate_content){
            //Crear el objeto a guardar
            var article = new Article();//instanciamos el objeto del modelo

            //Asignar valores al objeto
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el artículo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El artículo no se ha guardado'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                status: 'success',
                article: articleStored//ya que se asigno valores al objeto, devolvemos solo el article
                //article: params
                });
            });//utilizamos el metodo save que tiene varias caracteristicas, pasamos el parametro err (error)
            //en caso de que suceda, en caso de que se guarde nos devolvera esta variable relleno articleStored
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
        
    },

    getArticles: (req, res) => { //metodo getArticles
        
        var query = Article.find({});

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5); //colocamos un limit a la query que estamos haciendo
        }
        
        //Find (para sacar los datos de la BBDD)
        query.sort('-_id').exec((err, articles) => { //sin condiciones, por que quiero sacarlo todo, metodo sort para ordenar de manera descendente (-), utilizo el método exec
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los artículos'
                });    
            }
            
            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });    
            }
            
            return res.status(200).send({
                status: 'success',
                articles
            });
        }); 
    },

    getArticle: (req, res) => {
        
        //Recoger el id de la url
        var articleId = req.params.id;//*vamos a recoger el id que nos llega por la URL

        //Comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el artículo'
            });
        }

        //Buscar el artículo
        Article.findById(articleId, (err, article) => { //vamos a sacar un error (err) o el articulo que ha sacado
            
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo'
                });
            }
            //Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    update: (req, res) => {
        
        //Recoger el id del articulo por la url
        var articleId = req.params.id;

        //Recoger los datos que llegan por PUT
        var params = req.body;

        //Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);//cuando no este vacio params.title, validate_title sera true
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }
        if (validate_title && validate_content) {
            //Find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                //pasamos 3 parametros y la funcion de callback, _id, para que busque por id, params-lo que me ha llegado
                //new:true, le pasamos un json con las opciones - me va  a devolver el objeto que estoy actualizando - actualizado
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }else{
            //Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }
    },

    delete: (req, res) => {
        //Recoger el id de la url
        var articleId = req.params.id;

        //Find and delete
        Article.findByIdAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el artículo, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });       
    }
};//end controller 

//utilizamos el module export para poder utilizar este objeto fuera de este archivo y 
//luego utilizar todos estos archivos en las rutas
module.exports = controller;