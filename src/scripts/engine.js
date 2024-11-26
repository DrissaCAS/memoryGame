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
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value:{
        result: 0,
        curretTime: 15,
    },
    actions:{
        timeId: setInterval(checkMatch, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

// VARIAVEL PARA GUARDAR INFORMAÇÕES  CARTAS VIRADAS
let openCards = [];


let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));


for(let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}


// FUNÇÃO PARA OS ÁUDIOS
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
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
        
        alert("Game Over! Você acertou " + state.value.result + " pares.");
        
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        clearInterval(state.value.result);
    } else if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        playSound("game");
        
        alert("Parabéns! Você acertou todos os pares.");
        
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        clearInterval(state.value.result);
    }
}

// FUNÇÃO PARA COMPARAR SE OS PARES CORRESPONDEM
function checkMatch() {
    
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        playSound("hit");

        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");

        state.value.result++;
        state.view.score.textContent = state.value.result;
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    
    openCards = [];
}
