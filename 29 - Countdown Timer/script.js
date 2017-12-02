console.log('script.js');
let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countDown = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0){
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);

}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayTime = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = displayTime;
  document.title = displayTime;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hours > 12 ? hours - 12 : hours}: ${minutes < 10 ? '0' : ''}${minutes}`
}
function startTimer(){
  const timeToSet = parseInt(this.dataset.time);
  timer(timeToSet);
}
buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  timer(parseInt(this.minutes.value)*60);
  this.reset();
})
