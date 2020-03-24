var corDoBotao = ['verde', 'vermelho', 'amarelo', 'azul']

var padraoDaVez = []
var padraoDoJogador = []

var level = 0
var errouSom = new Audio('sounds/errado.mp3')
var start = true


//Iniciando o jogo
$(document).keypress(function () {
    if (start) {
        sequencia()
        start = false
    }
    else {
        console.log('start = falso')
    }
})

//Input do Jogador ao clicar em uma das cores
$('.btn').click(function () {
    $(this).addClass('pressed')
    setTimeout(() => {
        $(this).removeClass('pressed')
    }, 100);
    var corEscolhida = $(this).attr('id');
    padraoDoJogador.push(corEscolhida)
    var somBotao = new Audio('sounds/' + corEscolhida + '.mp3')
    somBotao.play();
    checarResposta(padraoDoJogador.length - 1);
})


//Checa se a resposta está correta
function checarResposta(levelAtual) {

    if (padraoDaVez[levelAtual] === padraoDoJogador[levelAtual]) { //Caso os dados sejam diferentes para o level         
        if (padraoDoJogador.length === padraoDaVez.length) { //Checa se já clicou em todos os botões da sequência
            setTimeout(function () {
                sequencia();
            }, 1000);
        }
    }

    else {
        console.log('Errou')
        errouSom.play()
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 100);
        $('h1').text('Fim de Jogo. Aperte qualquer telca para reiniciar')
        start = true //Permite que se inicie o jogo novamente
        level = 0
        padraoDaVez = [] //Zerar o padrão do jogo        
    }

}

//Tocando a sequência 
function sequencia() {
    padraoDoJogador = []; //Zera o padrão do jogador antes de começar um jogo ou no início de cada rodada
    level++;
    $('h1').text('Level ' + level);
    var numeroAleatorio = Math.round(Math.random() * 4);
    var corDaVez = corDoBotao[numeroAleatorio];
    padraoDaVez.push(corDaVez);

    $("#" + corDaVez).fadeOut(100).fadeIn(100);
    var som = new Audio('sounds/' + corDaVez + '.mp3')
    som.play();
}