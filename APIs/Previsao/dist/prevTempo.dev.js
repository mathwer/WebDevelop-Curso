"use strict";

var express = require('express');

var https = require('https');

var bodyParser = require('body-parser');

var config = require(__dirname + '/config.js'); //Para não mostrar a chave da API 


var part1 = config.parte6;
var part2 = config.parte3;
var part3 = config.parte5;
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res) {
  var query = req.body.cityName;
  var apiKey = part1 + part2 + part3;
  var unit = 'metric';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit + '&lang=pt_br';
  https.get(url, function (response) {
    //Quando o usuário chamar a pasta raís, o site irá fazer uma chamada na url especificada
    //console.log(response.statusCode) //teoricamente vai retornar 200, que é o código de que está tudo certo
    response.on('data', function (data) {
      var dataTempo = JSON.parse(data); //Transforma os dados recebidos de JSON para objeto
      //console.log(dataTempo) 

      var temp = dataTempo.main.temp;
      var condicao = dataTempo.weather[0].description; //Quando olhar no JSON, o item weather retorna um array cujo primeiro item é um objeto que contém a descrição

      var lugar = dataTempo.name; //Nome da cidade ou lugar 

      var icon = "http://openweathermap.org/img/wn/" + dataTempo.weather[0].icon + "@2x.png";
      res.set({
        'Content-Type': 'text/html; charset=utf-8'
      }); //Para o res.write() aceitar acentos e caracteres especiais

      res.write('<h1>Olá, bem vindo(a)!</h1>');

      if (condicao == 'nublado') {
        res.write('<h1>O tempo em ' + lugar + ' está ' + condicao + '.</h1>');
      } else {
        res.write('<h1>A cidade de ' + lugar + ' está com ' + condicao + '.</h1>');
      }

      res.write('<h1>A temperatura atual é ' + temp + 'ºC.</h1>');
      res.write('<img src= ' + icon + '>');
      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log('Ouvindo a porta 3000');
});