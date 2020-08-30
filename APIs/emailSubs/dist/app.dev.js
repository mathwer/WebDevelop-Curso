"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var request = require('request');

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
  console.log(nome + ' ' + sobrenome + ' ' + email);
});
app.listen(3000, function () {
  console.log('Ouvindo a porta 3000');
});