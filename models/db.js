// Conexion a mysql
const mysql = require('mysql')
// Conexion a cloudinary
const cloudinary = require('cloudinary').v2;

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'pachulinTech',
    user: 'Carlos',
    password: 'Golmania9.',
});

// Configuration 
cloudinary.config({
  cloud_name: "dhwtbjkbg",
  api_key: "589722782636753",
  api_secret: "p-gthiHYlOF2UewioQYVH1T8aiA"
});




conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error);
        return
    }
    console.log('Conectado a la BD MYSQL');
})

module.exports = conexion;