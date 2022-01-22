let lastOpenedProject = null;

function display(project) {
    try {
        document.getElementById(lastOpenedProject).style.display = "none";
    } catch (e) {}
    document.getElementById(project).style.display = "initial";
    lastOpenedProject = project;
}

function toggleDarkMode() {
    if (getComputedStyle(document.body).backgroundColor === "rgb(19, 20, 23)") {
        document.body.style.backgroundColor = "#FFFFFF";
    } else {
        document.body.style.backgroundColor = "#131417";
    }
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p").forEach(value => {
        console.log(value.style.color);
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