let DEBUG_MODE = false;

function toggleDebugMode() {
    DEBUG_MODE = !DEBUG_MODE;
    let divList = document.getElementsByTagName("div")
    for (let i = 0; i < divList.length; i++) {
        if (!divList.item(i).classList.contains("border")) {
            if (DEBUG_MODE) divList.item(i).style.border = "solid white 1px";
            else divList.item(i).style.border = "";
        }
    }
}

function updateTime() {
    document.getElementById("time").textContent = getTime();
}

updateTime(); setInterval(updateTime, 1000);