const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/frutasDb', { useNewUrlParser: true, useUnifiedTopology: true }); //Caso o Database que você está conectando não exista, ele será criado

const pessoaSchema = new mongoose.Schema ({
    nome: String,
    idade: Number,
})

const Pessoa = mongoose.model('Pessoa', pessoaSchema)  //Criando uma collection do mongo. Apesar do nome estar no singular e capitalizado, o mongoose vai colocar no plural.
const pessoa = new Pessoa ({
    nome: 'João',
    idade: 37,
})

//pessoa.save()

const frutaSchema = new mongoose.Schema ({
    nome: String,
    nota: Number,
    review: String
})

const Fruta = mongoose.model('Fruta', frutaSchema)

const kiwi = new Fruta({
    nome: 'Kiwi',
    nota: 10,
    review: 'Sensacional, ainda mais numa caipirinha'
})

const laranja = new Fruta({
    nome: 'Laranja',
    nota: 8, 
    review: 'Um pouco ácida demais, minha gastrite não gosta. Mas quando está doce, é perfeita.'
})

const Banana = new Fruta({
    nome: 'Banana',
    nota: 6,
    review: 'Gosto um pouco sem graça, mas eu consigo sobreviver'
})

// Fruta.insertMany([kiwi, laranja, Banana], function(err){
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log('Frutas salvas')
//     }
// })