const express = require('express')
const bodyParser = require('body-parser')

const app = express()

var itens = []  //Tem que ser criado aqui para que a app.get possa ter um valor

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

app.get('/', function (req, res) { 

    var today = new Date()
    //var hoje = today.getDay()
    //var diasDaSemana = ['Domingo', 'Segunda-Feria', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira','Sábado']
    //var dia = diasDaSemana[hoje]
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }

    var dia = today.toLocaleDateString('pt-br', options)

    res.render('list', {tipoDeDia: dia, itemNovo: itens})
 })

app.post('/', function (req, res){
    var item = req.body.atividade
    itens.push(item)
    //console.log(item)
    res.redirect('/')
})

app.listen(3000, function() { 
    console.log('Ouvindo a porta 3000')
 }) 