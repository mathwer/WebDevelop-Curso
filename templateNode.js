//Template para aplicação usando node.js e os módulos express e body-parser
// npm i express body-parser

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use('view engine', 'ejs')

app.get('/', function (req, res) { 
    console.log('Funcionando')
 })

app.listen(3000, function(){
    console.log('Ouvindo a porta 3000');
}) 