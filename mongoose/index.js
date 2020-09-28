const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/frutasDb', { useNewUrlParser: true, useUnifiedTopology: true }); //Caso o Database que você está conectando não exista, ele será criado




// ------------------------ Fim do dabase Pessoas ------------------------- //



// ------------------------ Database Frutas ------------------------- //

const frutaSchema = new mongoose.Schema ({
    nome: {
        type: String,
        required: [true, 'Não esqueça o nome :D']
    },
    nota: {
        type: Number,   //
        min: 0,         //  Aqui ocorre validação dos dados. Caso o sejam colocados valores não permitidos, o dado não irá para o database
        max: 10         //
    },
    review: String
})

const Fruta = mongoose.model('Fruta', frutaSchema)


// -------------------- Referência ------------------------ //


// const kiwi = new Fruta({
//     nome: 'Kiwi',
//     nota: 10,
//     review: 'Sensacional, ainda mais numa caipirinha'
// })

// const laranja = new Fruta({
//     nome: 'Laranja',
//     nota: 8, 
//     review: 'Um pouco ácida demais, minha gastrite não gosta. Mas quando está doce, é perfeita.'
// })

// const Banana = new Fruta({
//     nome: 'Banana',
//     nota: 6,
//     review: 'Gosto um pouco sem graça, mas eu consigo sobreviver'
// })
//
//
//
const Abacaxi = new Fruta({
    nome: 'Abacaxi',
    nota: 9,
    review:'Muito boa! A minha favorita :)'
})

const Uva = new Fruta({
    nome: 'Uva',
    nota: 10,
    review:'Apesar de as vezes ser amarga, gosto de comer várias de uma vez!'
})
//Uva.save()

//
//
// Fruta.insertMany([kiwi, laranja, Banana], function(err){ //Deixando em comentário para não adicionar mais 3 itens no databasa cade vez que o servidor reiniciar
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log('Frutas salvas')
//     }
// })

// ---------------------------------- Fim da Referência ------------------------------------ // 

// ---------- database Pessoas ----------------------- // 


const pessoaSchema = new mongoose.Schema ({
    nome: String,
    idade: Number,
    frutaFavorita: frutaSchema   //Ligando a collection Pessoa com o frutasDb
})


const Pessoa = mongoose.model('Pessoa', pessoaSchema)  //Criando uma collection do mongo. Apesar do nome estar no singular e capitalizado, o mongoose vai colocar no plural.
const pessoa = new Pessoa ({
    nome: 'Amy',
    idade: 12,
    frutaFavorita: Abacaxi
})

Pessoa.updateOne({nome: "João"}, {frutaFavorita: Uva}, function (err){})

//pessoa.save() //Vai salvar uma pessoa com os dados do objeto anterior

//Pessoa.deleteOne({idade: 12}, function (err){}) //Eu tinha colocado alguns itens repetidos, deletei com essa linha 



// Fruta.deleteOne({nome: "Banana"}, function (err){)}) //Eu tinha colocado alguns itens repetidos, deletei com essa linha 

Fruta.find(function(err, frutas){
    if (err){
        console.log(err)
    }
    else{        
        mongoose.connection.close() //Fechando a conxão com o database (boa prática)
        frutas.forEach(function(fruta){ //Pode usar pq a forma de visualização é um array com vários objetos
            console.log(fruta.nome)
        })
    }
})
