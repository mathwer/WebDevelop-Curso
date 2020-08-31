"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var request = require('request');

var config = require(__dirname + '/config.js');

var https = require('https');

var k1 = config.PARTE6;
var k2 = config.PARTE3;
var k3 = config.PARTE5;
var listId = config.listId;
var APIKey = k1 + k2 + k3;
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res) {
  var nome = req.body.Nome;
  var sobrenome = req.body.Sobrenome;
  var email = req.body.Email;
  console.log(nome + ' ' + sobrenome + ' ' + email); //A partir daqui é usada a documentação do mailchimp

  var data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: nome,
        LNAME: sobrenome
      }
    }]
  };
  var dataJson = JSON.stringify(data); //Para o mailchimp entender, o arquivo tem que estar em JSON

  var url = 'https://us17.api.mailchimp.com/3.0/lists/' + listId;
  var options = {
    method: 'POST',
    auth: 'matheus1:' + APIKey
  };
  var request = https.request(url, options, function (response) {
    response.on('data', function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(dataJson);
  request.end();
});
var porta = 4000;
app.listen(porta, function () {
  console.log('Ouvindo a porta ' + porta);
});