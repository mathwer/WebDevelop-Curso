//Colocando o código que não é diretamente um redirecionamento como é a parte do app.js

module.exports = diaDaSemana

function diaDaSemana() {
    let today = new Date()
    let hoje = today.getDay()
    let diasDaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    let dia = diasDaSemana[hoje]
    return dia
}

