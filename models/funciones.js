const conexion = require('../models/db');

exports.saveProducto = (req,res)=>{
    const descripcion = req.body.descripcionProducto;
    const precio = req.body.precioProducto;
    const imagen = req.files.imagenProducto[0].path.slice(6);;
    const stock = req.body.stockProducto;
    const categoria = req.body.categoriaProducto;
    const estado = req.body.estadoProducto;
    conexion.query('Insert into productos set ?', {descripcion: descripcion, precio: precio, stock: stock, imagen: imagen, categoria: categoria, estado : 1}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            setTimeout(() => {
                res.redirect('/administrador');
              }, 3000);
        }
    })
}

exports.savePreensamble = (req,res)=>{
    const descripcion = req.body.descripcionPreensamble;
    const precio = req.body.precioPreensamble;
    const stock = req.body.stockPreensamble;
    const imagen = req.files.imagenPreensamble[0].path.slice(6);
    const stats = req.files.stats[0].path.slice(6);;
    const categoria = req.body.categoriaPreensamble;
    const estado = req.body.estadoPreensamble;
    conexion.query('Insert into preensambladas set ?', {descripcion: descripcion, precio: precio, stock: stock, imagen: imagen, stats: stats, categoria: categoria, estado : 1}, (error,resultado)=>{
        if(error){
            console.log(error);
        }else{
            setTimeout(() => {
                res.redirect('/administrador');
              }, 3000);
        }
    })
}


exports.update = (req,res)=>{
    const {id} = req.params;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    const estado = req.body.estado;
    conexion.query('Update productos set ? where idProducto = ?',[{descripcion: descripcion, precio: precio, stock: stock, categoria: categoria, estado: estado},id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/busqueda');
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
