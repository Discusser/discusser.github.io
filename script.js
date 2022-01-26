let lastElementInteraction = [];

function display(element) {
    try {
        if (!document.getElementById(getArrayEnd(lastElementInteraction)).classList.contains("mainCategory")) {
            document.getElementById(getArrayEnd(lastElementInteraction)).style.display = "none";
        }
    } catch (e) {}
    document.getElementById(element).style.display = "initial";
    lastElementInteraction = lastElementInteraction.concat(element);
}

function _return() {
    document.getElementById(getArrayEnd(lastElementInteraction)).style.display = "none";
    lastElementInteraction = lastElementInteraction.splice(0, 1);
}

function toggleDarkMode() {
    if (getComputedStyle(document.body).backgroundColor === "rgb(19, 20, 23)") {
        document.body.style.backgroundColor = "#FFFFFF";
    } else {
        document.body.style.backgroundColor = "#131417";
    }
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p").forEach(value => {
       if (value.style.color === "rgb(19, 20, 23)") {
           value.style.color = "#FFFFFF";
       } else {
           value.style.color = "#131417";
       }
    })
}

function cat() {
    console.log("meow")
}