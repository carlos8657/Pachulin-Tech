const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require ('body-parser');
const conexion = require('../models/db')
const funciones = require('../models/funciones');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const users = []; // array para almacenar usuarios


const storage = multer.diskStorage({
    destination: 'public/img',
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

// Middleware
router.use(multer({
    storage,
    dest: 'public/img'
}).fields([{name: 'imagenProducto'},{name: 'imagenPreensamble'}, {name: 'stats'}]))


router.get('/inicio',(req,res)=>{
    res.render('inicio.html',);
})

router.get('/productos',(req,res)=>{
    conexion.query('Select * From productos', (error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('productos.html',{results});
        }
    })
})

router.get('/preensambles',(req,res)=>{
    res.render('preensambles.html',);
})

router.get('/promociones',(req,res)=>{
    res.render('promociones.html',);
})

router.get('/armado',(req,res)=>{
    conexion.query('Select * From productos', (error,results)=>{
        conexion.query('Select DISTINCT categoria From productos', (err,resultado)=>{
            if(error){
                throw error;
            }else{
                res.render('armado.html',{results,resultado});
            }
        })
    })
})


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

router.get('/editar_preensamble/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('Select * from productos where idProducto = ?',[id],(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.render('editar.html',{usuario: resultado[0]});
        }
    })
})




router.get('/desactivar/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('Update productos set ? where idProducto = ?',[{estado: 0},id],(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/busqueda');
        }
    })
})

router.get('/activar/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('Update productos set ? where idProducto = ?',[{estado: 1},id],(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/busqueda');
        }
    })
})

router.get('/busqueda', async (req,res)=>{
    conexion.query('Select * From productos', (error,results,fields)=>{
        if(error){
            throw error;
        }else{
            fields[fields.length] = {name: 'Acciones'}
            res.render('busqueda.html',{results,fields});
        }
    })
    
})

router.get('/ventas', async (req,res)=>{
    conexion.query('Select * From ventas', (error,results,fields)=>{
        if(error){
            throw error;
        }else{
            fields[fields.length] = {name: 'Acciones'}
            res.render('ventas.html',{results,fields});
        }
    })
    
})

router.get('/detalles/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('select detallesVentaProducto.idProducto, productos.descripcion  from detallesVentaProducto inner join productos on detallesVentaProducto.idProducto = productos.idProducto where detallesVentaProducto.idVentaProducto = ?;',[id],(error,resultado,fields)=>{
        conexion.query('select detallesVentaPreensamblada.idPreensamblada, preensambladas.descripcion  from detallesVentaPreensamblada inner join preensambladas on detallesVentaPreensamblada.idPreensamblada = preensambladas.idPreensamblada where detallesVentaPreensamblada.idVentaPreensamblada = ?',[id], (error,results)=>{
            if(error){
                throw error;
            }else{
                fields[fields.length] = {name: 'Acciones'}
                res.render('detalles.html',{resultado,fields,results});
            }
        })
    })
})

router.post('/register', (req, res) => {
    const { usuario, correo, contra } = req.body;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(contra, salt, function(err, hash) {
            const user = { usuario, correo, contra: hash };
            users.push(user);
            console.log('Usuario registrado:', user);
            console.log('Datos recibidos');
        });
    });
});

router.post('/login', (req, res) => {
    const { correo, contra } = req.body;

    const user = users.find(user => user.correo === correo);

    if (user) {
        bcrypt.compare(contra, user.contra, function(err, result) {
            if (result) {
                console.log('Inicio de sesión exitoso para el usuario:', user);
                console.log('Inicio de sesión exitoso');
            } else {
                console.log('Contraseña incorrecta para el usuario:', user);
                console.log('Contraseña incorrecta');
            }
        });
    } else {
        console.log('Usuario no encontrado con el email:', correo);
        console.log('Usuario no encontrado');
    }
});



router.get('/login',(req,res)=>{
    res.render('login.html',);
})

router.get('/register',(req,res)=>{
    res.render('register.html',);
})

router.get('/usuarios',(req,res)=>{
    res.render('usuarios.html',);
})


router.post('/saveProducto',funciones.saveProducto)
router.post('/savePreensamble',funciones.savePreensamble)
router.post('/buscar',funciones.buscar)
router.post('/update/:id',funciones.update)


module.exports=router;
