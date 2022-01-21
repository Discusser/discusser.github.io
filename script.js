let lastOpenedProject = null;

function displayHome(currentPage) {
    document.getElementById(currentPage).style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
}

function display(project) {
    try {
        document.getElementById(lastOpenedProject).style.visibility = "hidden";
    } catch (e) {}
    document.getElementById(project).style.visibility = "visible";
    lastOpenedProject = project;
}