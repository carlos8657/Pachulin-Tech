// Conexion a mysql
const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'pachulintech',
    user: 'Carlos',
    password: 'Golmania9.',
});


conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error);
        return
    }
    console.log('Conectado a la BD MYSQL');
})

module.exports = conexion;