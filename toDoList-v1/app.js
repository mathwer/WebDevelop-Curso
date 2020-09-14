const express = require('express')
const bodyParser = require('body-parser')
const mdata = require(__dirname + '/day.js')

const app = express()


var itens = []  //Tem que ser criado aqui para que a app.get possa ter um valor

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', function (req, res) {
    let dia = mdata()//Seta o dia da semana através do módulo 
    res.render('list', { nomeDaLista: dia, itemNovo: itens })
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.post('/', function (req, res) {
    var item = req.body.atividade
    itens.push(item)
    //console.log(item)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('Ouvindo a porta 3000')
}) 