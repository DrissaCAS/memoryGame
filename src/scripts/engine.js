const emojis = [
    "❤️",
    "❤️",
    "😁",
    "😁",
    "😎",
    "😎",
    "😡",
    "😡",
    "😱",
    "😱",
    "🤡",
    "🤡",
    "💩",
    "💩",
    "😻",
    "😻"
];
const state = {
    view:{
        // lifeLeft: document.querySelector("#lives"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value:{
        // contLife: 5,
        result: 0,
        curretTime: 20,
    },
    actions:{
        timeId: setInterval(checkMatch, 1000),
        // lifeId: setInterval(checkMatch, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

// VARIAVEL PARA GUARDAR INFORMAÇÕES  CARTAS VIRADAS
let openCards = [];


let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));


for(let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    let boxId = document.createAttribute('id');

    boxId.value = i;
    box.setAttributeNode(boxId);

    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;

    document.querySelector(".game").appendChild(box);
}


// FUNÇÃO PARA OS ÁUDIOS
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.4;
    audio.play();
}

// FUNÇÃO PARA LIMPAR DADOS
function clearTime() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    clearInterval(state.value.result);
}

// FUNÇÃO PARA MENSAGEM GAME OVER
function messageGameOver() {
    let over = document.createElement("div");
    over.id = "modal";
    over.innerHTML = "Game Over! Você acertou " + state.value.result + " pares.";
    document.querySelector(".container").appendChild(over);
}

// FUNÇÃO PARA MENSAGEM DE VITÓRIA
function messageVictory() {
    let victory = document.createElement("div");
    victory.id = "modal";
    victory.innerHTML = "Parabéns! Você acertou todos os par(es).";
    document.querySelector(".container").appendChild(victory);
}

// FUNÇÃO PARA GUARDAR INFORMAÇÃO DA CARTA VIRADA
function handleClick() {
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    
    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }
}

// FUNÇÃO PARA CONTROLAR O TEMPO
function countDown(){
    state.value.curretTime--;
    state.view.timeLeft.textContent = state.value.curretTime;    
    
    if(state.value.curretTime <= 0){
        playSound("game-over");
        
        messageGameOver();

        clearTime();
    } else if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        playSound("game");
        
        messageVictory();
        
        clearTime();
    }
}

// FUNÇÃO PARA COMPARAR SE OS PARES CORRESPONDEM
function checkMatch() {
    
    if(openCards[0].innerHTML === openCards[1].innerHTML && openCards[0].id !== openCards[1].id) {
        playSound("hit");

        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");

        state.value.result++;
        state.view.score.textContent = state.value.result;
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        
        // state.value.contLife--;
        // state.view.lifeLeft.textContent = state.value.contLife;
    }
    
    openCards = [];

    
}
