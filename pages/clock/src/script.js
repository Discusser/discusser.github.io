const clockImage = document.getElementById("clock_image");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");

function rotateHands(sec, min, hr) {
    seconds.style.transform = `rotate(${sec * 6}deg)`;
    minutes.style.transform = `rotate(${(min + sec / 60) * 6}deg)`;
    let exactHour = (hr + min / 60 + sec / 3600);
    if (exactHour > 12) {
        hours.style.transform = `rotate(${(exactHour - 12) * 30}deg)`;
    } else {
        hours.style.transform = `rotate(${exactHour * 30}deg)`;
    }
}

function displayTime() {
    let today = new Date();
    let date = today.getDate().toString();
    let suffix;
    let month = today.getMonth();

    if (date[date.length - 2] === 1) {
        suffix = "th"
    } else {
        switch (date[date.length - 1]) {
            case '1':
                suffix = "st"
                break
            case '2':
                suffix = "nd"
                break
            case '3':
                suffix = "rd"
                break
            default:
                suffix = "th"
                break
        }
    }

    switch (month + 1) {
        case 1:
            month = "January"
            break
        case 2:
            month = "February"
            break
        case 3:
            month = "March"
            break
        case 4:
            month = "April"
            break
        case 5:
            month = "May"
            break
        case 6:
            month = "June"
            break
        case 7:
            month = "July"
            break
        case 8:
            month = "August"
            break
        case 9:
            month = "September"
            break
        case 10:
            month = "October"
            break
        case 11:
            month = "November"
            break
        case 12:
            month = "December"
            break
    }

    document.getElementById("date").innerHTML = "Today is the " + date + suffix + " of " + month + " " + today.getFullYear();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    rotateHands(seconds, minutes, hours);
    if (hours < 10) { hours = "0" + hours.toString() }
    if (minutes < 10) { minutes = "0" + minutes.toString() }
    if (seconds < 10) { seconds = "0" + seconds.toString() }

    document.getElementById("time").innerHTML = "It is " + hours + ":" + minutes + ":" + seconds;
}

displayTime();
setInterval(displayTime, 1000);

window.addEventListener("load", () => {
    // dont ask
    const handHeight = parseInt(window.getComputedStyle(clockImage).width) / 2;
    seconds.style.height = handHeight / 1.2 + "px";
    // handHeight - parseInt(window.getComputedStyle(seconds).height)
    seconds.style.top = parseInt(window.getComputedStyle(seconds).top) + handHeight - parseInt(window.getComputedStyle(seconds).height)
        + "px";
    seconds.style.left = parseInt(window.getComputedStyle(seconds).left) - 1 + "px";
    minutes.style.height = handHeight / 1.2 + "px";
    minutes.style.top = parseInt(window.getComputedStyle(minutes).top) + handHeight - parseInt(window.getComputedStyle(minutes).height)
        + "px";
    minutes.style.left = parseInt(window.getComputedStyle(minutes).left) - 1 + "px";
    hours.style.height = handHeight / 1.5 + "px";
    hours.style.top = parseInt(window.getComputedStyle(hours).top) + handHeight - parseInt(window.getComputedStyle(hours).height)
        + "px";
    hours.style.left = parseInt(window.getComputedStyle(hours).left) - 1 + "px";
})