"use strict";

//Iniciar atraves do nodemon (nodemon start pelo terminal )
var express = require('express');

var app = express();
app.get('/', function (req, res) {
  //O '/' é o site acessado, no caso a raíz
  //console.log(req)
  //console.log(res)
  res.send('<h1>Olá, aqui é o servidor</h1>');
});
app.get('/contato', function (req, res) {
  res.send('Entre em contato em matwer12@gmail.com');
});
app.get('/about', function (req, res) {
  res.send('Esse é um pseudo site, para treinar servidores usando express.');
});
app.get('/hobbies', function (req, res) {
  res.send('<ul><li>Jogos</li><li>Comidas</li><li>Música</li></ul>');
});
app.listen(3000, function () {
  console.log('Servidor ouvindo a porta 3000');
}); //  process.on('SIGINT', function() {  //O servior não está fechando com o ctrl+C, então coloquei essa função
//      socket.close();
//      process.exit();
//    });   // Quando instalei o nodemon, o servidor voltou a funcionar normalmente