
function rolar(){
    var aleatorio1 = Math.floor(Math.random()*6 + 1);
    var aleatorio2 = Math.floor(Math.random()*6 + 1)
    
    var dado1 = document.querySelector('.img1').setAttribute('src', `images/dice${aleatorio1}.png`);
    var dado2 = document.querySelector('.img2').setAttribute('src', `images/dice${aleatorio2}.png`);
    
    if(aleatorio2==aleatorio1){
        document.querySelector('h1').innerHTML = "Empate!"
    }
    else if (aleatorio1 > aleatorio2){
        document.querySelector('h1').innerHTML = "Jogador 1 Ganhou"
    }
    else{
        document.querySelector('h1').innerHTML = "Jogador 2 Ganhou"
    }
    
}

var botao = document.querySelector('.btn').onclick = function() {rolar()}
