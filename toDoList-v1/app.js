const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.get('/', function (req, res) { 
    var today = new Date()
    var hoje = today.getDay()
    var diasDaSemana = ['Domingo', 'Segunda-Feria', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira','Sábado']
    var dia = diasDaSemana[hoje]
    
    res.render('list', {tipoDeDia: dia})

 })



app.listen(3000, function() { 
    console.log('Ouvindo a porta 3000')
 })