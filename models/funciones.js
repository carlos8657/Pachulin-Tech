const conexion = require('../models/db');

exports.save = (req,res)=>{
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const imagen = req.body.imagen;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    const estado = req.body.estado;
    conexion.query('Insert into productos set ?', {descripcion: descripcion, precio: precio, imagen: imagen, stock: stock, categoria: categoria, estado : 1}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/administrador');
        }
    })
}

exports.update = (req,res)=>{
    const {id} = req.params;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const imagen = req.body.imagen;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    const estado = req.body.estado;
    conexion.query('Update productos set ? where idProducto = ?',[{descripcion: descripcion, precio: precio, imagen: imagen, stock: stock, categoria: categoria, estado: estado},id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/administrador');
        }
    })
}

exports.buscar = (req,res)=>{
    const palabra = req.body.palabra;
    conexion.query("select * from productos where idProducto like '%"+ palabra +"%' or descripcion like '%"+ palabra +"%' or precio like '%"+ palabra +"%' or imagen like '%"+ palabra +"%' or stock like '%"+ palabra +"%' or categoria like '%"+ palabra +"%' or estado like '%"+ palabra +"%'",(error,results,fields)=>{
        if(error){
            console.log(error);
        }else{
            fields[fields.length] = {name: 'Acciones'}
            res.render('busqueda.html',{results,fields});
        }
    })


}
