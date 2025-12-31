let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    // endTime.textContent = `Be Back AT ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
    // for am and pm
    endTime.textContent = `Be Back AT ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes} ${hour < 12 ? 'am' : 'pm'}`;
}

function startTimer() {
    const seconds = this.dataset.time;
    timer(seconds);
}

buttons.forEach(button =>  button.addEventListener('click', startTimer));
// can use custom names like <form name="customForm" id="custom">
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});