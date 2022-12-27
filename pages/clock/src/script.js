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
    if (hours < 10) { hours = "0" + hours.toString() }
    if (minutes < 10) { minutes = "0" + minutes.toString() }
    if (seconds < 10) { seconds = "0" + seconds.toString() }

    document.getElementById("time").innerHTML = "It is " + hours + ":" + minutes + ":" + seconds;
}

displayTime();
setInterval(displayTime, 1000);