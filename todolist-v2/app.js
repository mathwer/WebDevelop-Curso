//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const _ = require('lodash')

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

const listSchema = {
  nome: String,
  itens: [itemSchema]
}

const Lista = mongoose.model("Lista", listSchema)

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

    if (itens.length === 0) {
      Item.insertMany(itensPadrao, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Itens salvos no database')
        }
      })
      res.redirect('/')
    } else {
      res.render("list", {
        listTitle: 'Hoje',
        newListItems: itens
      });
    }
  })
})

app.post("/", function (req, res) {

  const nomeDoItem = req.body.newItem;
  const nomeDaLista = req.body.list

  const itemNovo = new Item({
    nome: nomeDoItem
  })

  if (nomeDaLista === 'Hoje') { //Lista padrão
    itemNovo.save(function (err) {})
    res.redirect('/')
  } else { //Lista Customizada
    Lista.findOne({
      nome: nomeDaLista
    }, function (err, lista) {
      lista.itens.push(itemNovo)
      lista.save(function (err) {
        res.redirect('/' + nomeDaLista)
      })
    })
  }

});

app.post("/delete", function (req, res) {
  const id = req.body.checkbox
  const nomeDaLista = req.body.nomeDaLista

  if (nomeDaLista === 'Hoje') {
    Item.deleteOne({
      _id: id
    }, function (err) {})
    res.redirect('/')
  } else {
    Lista.findOneAndUpdate({
      nome: nomeDaLista
    }, {
      $pull: {
        itens: {
          _id: id
        }
      }
    }, function (err, lista) {
      res.redirect('/' + nomeDaLista)
    })

  }

})

// --------------------- Lista customizada -------------------

app.get('/:nomeDaLista', function (req, res) {
  
  const nomeDaLista = _.capitalize(req.params.nomeDaLista)

  Lista.findOne({
    nome: nomeDaLista
  }, function (err, lista) {

    if (!lista) {
      const lista = new Lista({
        nome: nomeDaLista,
        itens: itensPadrao
      })
      lista.save(function (err) {
        res.redirect('/' + nomeDaLista)
      })
    } else {
      res.render('list', {
        listTitle: nomeDaLista,
        newListItems: lista.itens
      })
    }
  })
})


// ----------------- Sobre ------------------
app.get("/about", function (req, res) {
  res.render("about");
});


app.listen(3000, function () {
  console.log("Servidor iniciado na porta 3000");
});