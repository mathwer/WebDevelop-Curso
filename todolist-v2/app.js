//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//------------------- Database ------------------------

mongoose.connect("mongodb://localhost:27017/todolistDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = {
  nome: String
}

const Item = mongoose.model('Item', itemSchema)

const Item1 = new Item({
  nome: 'Bem vindo a sua lista de tarefas'
})
const Item2 = new Item({
  nome: 'Clique no botão + para adicionar itens'
})
const Item3 = new Item({
  nome: '<----- Clique aqui para deletar itens'
})

const itensPadrao = [Item1, Item2, Item3]



// ------------ Direcionamento Express ----------
app.get("/", function (req, res) {

  Item.find(function (err, itens) {

    if (itensPadrao.length === 0) {
      Item.insertMany(itensPadrao, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Itens salvos no database')
        }
      })
      res.redirect('/')
    }
    else{
      res.render("list", {
        listTitle: 'Hoje',
        newListItems: itens
      });
    }    
  })
})


app.post("/", function (req, res) {

  const nomeDoItem = req.body.newItem;

  const itemNovo = new Item({
    nome: nomeDoItem
  })

  itemNovo.save(function (err){})
  res.redirect('/')
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});


app.listen(3000, function () {
  console.log("Servidor iniciado na porta 3000");
});