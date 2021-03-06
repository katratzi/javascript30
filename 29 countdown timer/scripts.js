let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timer
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then); // only need to run once to display end

  // fire off this interval every second
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  // split into minues and seconds for display
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // convert single digit in seconds to 2 digits
  const display = `${minutes}:${remainderSeconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}`;

  // now set the title and the text
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  // calculate end time, get hour and minute
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // display, again with 2digits for minutes
  endTime.textContent = `Be back at ${hour}:${minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}`;
}

function startTimer()
{
  // let's get the data
   const seconds = parseInt(this.dataset.time);   
   timer(seconds);  
}

buttons.forEach(button => button.addEventListener('click', startTimer))
//if element has a name we can just use it in the . bit :)
document.customForm.addEventListener('submit', function(e) {
e.preventDefault();
const mins = this.minutes.value;
console.log(mins);
timer(mins * 60);
this.reset();
});