const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const config = require(__dirname+'/config.js')
const https = require('https')

const k1 = config.PARTE6
const k2 = config.PARTE3
const k3 = config.PARTE5
const listId = config.listId
const APIKey = k1 + k2 + k3

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', function(req, res) { 
    res.sendFile(__dirname + '/index.html')
 })


app.post('/', function(req, res){
    var nome = req.body.Nome
    var sobrenome = req.body.Sobrenome
    var email = req.body.Email
    console.log(nome + ' ' + sobrenome + ' ' + email)

    //A partir daqui é usada a documentação do mailchimp
    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields:{
                    FNAME: nome,
                    LNAME: sobrenome                    
                }
            }
        ]
    }

    var dataJson = JSON.stringify(data) //Para o mailchimp entender, o arquivo tem que estar em JSON
    const url = 'https://us17.api.mailchimp.com/3.0/lists/' + listId

    const options = {
        method: 'POST',
        auth: 'matheus1:' + APIKey
    }

    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }
        else{
            res.sendFile(__dirname + '/failure.html')
        }

        response.on('data', function(data){
            console.log(JSON.parse(data))    
        })


    })

    request.write(dataJson)
    request.end()
}) 


var porta = 3000
app.listen(process.env.PORT || porta, function(){
    console.log('Ouvindo a porta ' + porta);
})