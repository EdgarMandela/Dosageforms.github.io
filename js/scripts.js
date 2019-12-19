let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // seconds left on the clock
let waitingTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;
const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startCount = document.querySelector("#start-btn");
const resetTimer = document.querySelector("#reset");
const prescriptionSessions = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");
const alarm = document.createElement('audio'); // An alarm sound will play when the timer reaches 0
alarm.setAttribute("src", "http://soundbible.com/mp3/Fire_pager-jason-1283464858.mp3");
/* event listeners for reset and stating and pausing */
startCount.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
})
resetTimer.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = waitingTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
})
/* timer - handles count down till zero */
function timer() {
  seconds--;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    seconds = (isBreak ? breakTime : waitingTime) * 60;
    isBreak = !isBreak;
  }
}
/* allows for color increment in steps of 10 minutes */
let increment = 10;
let incrementFunctions =
  {
    "#work-plus": function () { waitingTime = Math.min(waitingTime + increment, 60) },
    "#work-minus": function () { waitingTime = Math.max(waitingTime - increment, 5) },
    "#break-plus": function () { breakTime = Math.min(breakTime + increment, 60) },
    "#break-minus": function () { breakTime = Math.max(breakTime - increment, 5) }
  };
for (var key in incrementFunctions) {
  if (incrementFunctions.hasOwnProperty(key)) {
    document.querySelector(key).onclick = incrementFunctions[key];
  }
}
/* update html text content according to timer change */
function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}
function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startCount.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startCount.textContent = "Continue";
  } else {
    startCount.textContent = "Pause";
  }
}
function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak ? status.textContent = "Not yet time" : status.textContent = "Take Your Drugs!";
  prescriptionSessions.textContent = waitingTime;
  breakMin.textContent = breakTime;
}
window.setInterval(updateHTML, 100);
document.onclick = updateHTML;

let bot = new RiveScript();
const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');
const brains = [
  'https://gist.githubusercontent.com/awesammcoder/91e0f6c527bfdc03b8815289ca4af150/raw/6410ce00b7e1ea0dbd28be03b6eaab64252a841d/brain.rive'
];
bot.loadFile(brains).then(botReady).catch(botNotReady);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = '';
});
function botReply(message){
  message_container.innerHTML += `<div class="bot">${message}</div>`;
  location.href = '#edge';
}
function selfReply(message){
  message_container.innerHTML += `<div class="self">${message}</div>`;
  location.href = '#edge';
  bot.reply("local-user", message).then(function(reply) {
    botReply(reply);
  });
}
function botReady(){
  bot.sortReplies();
  botReply('Hello');
}
function botNotReady(err){
  console.log("An error has occurred.", err);
}