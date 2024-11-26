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
// const state = {
//     view: {

//     }
// }

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

// FUNÇÃO PARA COMPARAR SE OS PARES CORRESPONDEM
function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        playSound("hit");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    
    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Parabéns! Você acertou todos os pares.");
    }
}