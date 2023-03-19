const conexion = require('../models/db');

exports.save = (req,res)=>{
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stats = req.body.stats;
    const imagen = req.body.imagen;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    conexion.query('Insert into productos set ?', {descripcion: descripcion, precio: precio, stats: stats, imagen: imagen, stock: stock, categoria: categoria}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/administrador');
        }
    })
}

exports.update = (req,res)=>{
    const idProducto = req.params.id;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stats = req.body.stats;
    const imagen = req.body.imagen;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    conexion.query('Update productos set ? where idProducto = ?',[{descripcion: descripcion, precio: precio, stats: stats, imagen: imagen, stock: stock, categoria: categoria},idProducto],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/administrador');
        }
    })

}
