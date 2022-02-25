var lastElement;
var lastCategory;
// dont touch, weird code
function display(element) {
    var elem = document.getElementById(element);
    try {
        if (lastElement.classList.contains("page"))
            lastElement.style.display = "none";
    }
    catch (e) { }
    if (elem.classList.contains("main-category")) {
        try {
            lastCategory.style.display = "none";
            var children = lastCategory.querySelectorAll("*");
            for (var i = 0; i < children.length; i++) {
                if (children[i].classList.contains("category")) {
                    children[i].style.display = "none";
                }
            }
        }
        catch (e) { }
        finally {
            lastCategory = elem;
        }
    }
    elem.style.display = "inline";
    lastElement = elem;
}
function _return() {
    if (lastElement != null) {
        if (lastElement != document.body) {
            var elem = lastElement;
            elem.style.display = "none";
            if (elem.parentElement.classList.contains("hideable")) {
                lastElement = elem.parentElement;
            }
            else {
                while (!elem.parentElement.classList.contains("hideable")) {
                    if (elem.parentElement == document.body)
                        break;
                    elem = elem.parentElement;
                }
                if (elem.parentElement != document.body)
                    lastElement = elem.parentElement;
            }
        }
    }
}
function toggleDarkMode() {
    if (getComputedStyle(document.body).backgroundColor === "rgb(19, 20, 23)") {
        document.body.style.backgroundColor = "#FFFFFF";
    }
    else {
        document.body.style.backgroundColor = "#131417";
    }
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p").forEach(function (value) {
        var v = value;
        if (v.style.color === "rgb(19, 20, 23)") {
            v.style.color = "#FFFFFF";
        }
        else {
            v.style.color = "#131417";
        }
    });
}
function cat() {
    console.log("meow");
}
function displayClock() {
    window.location.href = "https://discusser.github.io/jsClock/";
}
