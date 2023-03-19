const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const misRutas = require('./router/index');
const path = require('path');


const app = express()
const { renderFile } = require('ejs')

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.engine('html',require('ejs').renderFile)

app.use(bodyParser.urlencoded({extended:true}));
app.use(misRutas);
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname + '/public/error.html');
})

const port = 2000
app.listen(port,()=>{
    console.log('Inciado el puerto 2000')
})


