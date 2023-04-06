const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber()

console.log("Random Number is :",randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition & game
recognition.start()

//capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;

  writeMessage(msg)
  checkNumber(msg)
}

//write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

//check msg against number 
function checkNumber(msg) {
  const num = +msg;

  //check if valid number or not
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>Tha is not a valid number!!</div>`;
    return;
  }

  //check range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 - 100 .</div>`;
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}


//generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1 ;
}

//speaks the result
recognition.addEventListener('result', onSpeak)

//end SR services
recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
  if(e.target.id === 'play-again'){
    window.location.reload()
  }
})