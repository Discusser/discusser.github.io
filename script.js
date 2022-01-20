function displayHome(currentPage) {
    document.getElementById(currentPage).style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
}

function display(project) {
    document.getElementById("projectNameCPP").style.visibility = "hidden";
    document.getElementById("backupScriptBash").style.visibility = "hidden";
    document.getElementById(project).style.visibility = "visible";
}