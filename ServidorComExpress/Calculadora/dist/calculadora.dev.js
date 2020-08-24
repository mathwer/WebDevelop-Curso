"use strict";

var express = require('express');

var bodyParser = require('body-parser'); //Pacote para ler info vinda da form do html


var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res) {
  console.log(req.body); //Vai mostrar as informações enviadas pela form

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var resultado = num1 + num2; //res.send('Obrigado por calcular :B')    
  //res.send('<br></br>')

  res.send('Sua resposta é ' + resultado);
});
app.get('/BMI', function (req, res) {
  res.sendFile(__dirname + '/calculadoraBMI.html');
});
app.post('/BMI', function (req, res) {
  var altura = parseFloat(req.body.altura);
  var peso = parseFloat(req.body.peso);
  var altura = altura / 100;
  var bmi = peso / (altura * altura);
  res.send('Seu BMI é ' + bmi);
});
app.listen(4000, function () {
  console.log('Funcionando! Ouvindo a porta 4000!');
});