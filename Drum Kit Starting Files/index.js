var numBtn = document.querySelectorAll('.drum').length;

var teclaPressionada = function(key){
            
    switch (key) {
        case 'w':
            var crash = new Audio('sounds/crash.mp3');
            crash.play()
            break;

        case 'a':
            var tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play()
            break;

        case 's':
            var tom2 = new Audio('sounds/tom-2.mp3');
            tom2.play()
            break;

        case 'd':
            var kick = new Audio('sounds/kick-bass.mp3');
            kick.play()
            break;

        case 'j':
            var snare = new Audio('sounds/snare.mp3');
            snare.play()
            break;

        case 'k':
            var tom3 = new Audio('sounds/tom-3.mp3');
            tom3.play()
            break;

        case 'l':
            var tom4 = new Audio('sounds/tom-4.mp3');
            tom4.play()
            break;


        default:
            console.log('não foi :< ')
            break;
    }

}

for( i=0; i<numBtn; i++){
    document.querySelectorAll('.drum')[i].addEventListener('click', function(){
        var textoHtml = this.innerHTML
        teclaPressionada(textoHtml)
        botaoAtivo(textoHtml)
    })
}

document.addEventListener('keydown', function(event){

    teclaPressionada(event.key)
    botaoAtivo(event.key)

})

function botaoAtivo(botao){
    var botaoAtual = document.querySelector('.'+botao)
    botaoAtual.classList.add('pressed')
    function remover(){botaoAtual.classList.remove('pressed')}
    setTimeout(remover, 100)

}