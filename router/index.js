const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const conexion = require('../models/db')
const funciones = require('../models/funciones');

router.get('/administrador', async (req,res)=>{

    conexion.query('Select * From productos', (error,results,fields)=>{
        if(error){
            throw error;
        }else{
            fields[fields.length] = {name: 'Acciones'}
            res.render('administrador.html',{results,fields});
        }
    })
    
})

router.get('/productos', async (req,res)=>{
    res.render('productos.html');
})

router.get('/armado', async (req,res)=>{
    res.render('armado.html');
})

router.get('/inicio', async (req,res)=>{
    res.render('inicio.html');
})

router.get('/login', async (req,res)=>{
    res.render('login.html');
})

router.get('/editar/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('Select * from productos where idProducto = ?',[id],(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.render('editar.html',{usuario: resultado[0]});
        }
    })
})

router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('Delete from productos where idProducto = ?',[id],(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/administrador');
        }
    })
})

router.post('/save',funciones.save)
router.post('/update',funciones.update)




module.exports=router;
