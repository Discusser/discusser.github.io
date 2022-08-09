let lastElement: HTMLElement;
let lastCategory: HTMLElement;

// dont touch, weird code
function display(element: string) {
    let elem = document.getElementById(element);

    try {
        if (lastElement.classList.contains("page")) lastElement.style.display = "none";
    } catch (e) {}
    if (elem.classList.contains("main-category")) {
        try {
            lastCategory.style.display = "none";
            let children = lastCategory.querySelectorAll("*");
            for (let i = 0; i < children.length; i++) {
                if (children[i].classList.contains("category")) {
                    (children[i] as HTMLElement).style.display = "none";
                }
            }
        } catch (e) {} finally {
            lastCategory = elem;
        }
    }

    elem.style.display = "inline";
    lastElement = elem;
}

function _return() {
    if (lastElement != null) {
        if (lastElement != document.body) {
            let elem = lastElement;

            elem.style.display = "none";

            if (elem.parentElement.classList.contains("hideable")) {
                lastElement = elem.parentElement;
            } else {
                while (!elem.parentElement.classList.contains("hideable")) {
                    if (elem.parentElement == document.body) break;
                    elem = elem.parentElement;
                }
                if (elem.parentElement != document.body) lastElement = elem.parentElement;
            }
        }
    }
}

function toggleDarkMode() {
    if (getComputedStyle(document.body).backgroundColor === "rgb(19, 20, 23)") {
        document.body.style.backgroundColor = "#FFFFFF";
    } else {
        document.body.style.backgroundColor = "#131417";
    }
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p").forEach(value => {
        let v = value as HTMLElement;
        if (v.style.color === "rgb(19, 20, 23)") {
            v.style.color = "#FFFFFF";
        } else {
            v.style.color = "#131417";
        }
    })
}

function cat() {
    console.log("meow")
}

function displayClock() {
    window.location.href = "../jsClock/";
}

function displayFileStorage() {
    window.location.href = "../files"
}