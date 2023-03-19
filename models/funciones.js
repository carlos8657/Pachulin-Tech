const conexion = require('../models/db');

exports.save = (req,res)=>{
    const nombre = req.body.nombre;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    conexion.query('Insert into usuarios set ?', {nombre:nombre, apellidoP: apellidoP, apellidoM: apellidoM}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/administrador');
        }
    })
}

exports.update = (req,res)=>{
    const id = req.body.idUsuario;
    const nombre = req.body.nombre;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    conexion.query('Update usuarios set ? where idUsuario = ?',[{nombre:nombre, apellidoP: apellidoP, apellidoM: apellidoM},id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/administrador');
        }
    })

}
