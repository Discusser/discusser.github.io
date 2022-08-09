import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit({
    auth: `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` // Key is public because it can only be used to read contents of public repositories
    // todo: make the key private/encrypted, I don't like the fact that anyone can use it even if it doesn't have any permissions
});

/**
 * File sorting by name toggle<br>
 * null: default value, nothing<br>
 * false: inverse alphabetical order<br>
 * true: alphabetical order
 **/
let nameSort = null;
/**
 * File sorting by size toggle<br>
 * null: default value, nothing<br>
 * false: descending<br>
 * true: ascending
 **/
let sizeSort = null;
/**
 * File sorting by type toggle<br>
 * null: default value, nothing<br>
 * false: inverse alphabetical sort<br>
 * true: alphabetical sort
 **/
let typeSort = null;

/**
 * @see https://stackoverflow.com/a/18650828
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

let currentPath = ""
let response = await request(currentPath)

function request(path) {
    return octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "Discusser",
        repo: "fileStorage",
        path: path
    })
}

function resetFileView(table) {
    while (table.firstChild) {
        table.removeChild(table.lastChild)
    }
}

async function changePath(path) {
    nameSort = true;
    sizeSort = null;
    typeSort = null;
    currentPath = path
    response = await request(path);
    let index = document.getElementById("index");
    index.innerHTML = "Index of <a href=\"https://github.com/Discusser/fileStorage/blob/main/" + path + "\">/" + path + "</a>"
    try {
        Array.from(document.getElementsByClassName("remove")).forEach(value => value.remove());
    } catch (TypeError) {}
    resetFileView(table)
    files = []
    if (path !== "") {
        let parentDir = document.createElement("div")
        parentDir.classList.add("remove");
        let img = document.createElement("img");
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR42myTA+w1RxRHz+zftmrbdlTbtq04qRGrCmvbDWp9tq3a7tPcub8mj9XZ3eHOGQdJAHw77/LbZuvnWy+c/CIAd+91CMf3bo+bgcBiBAGIZKXb19/zodsAkFT+3px+ssYfyHTQW5tr05dCOf3xN49KaVX9+2zy1dX4XMk+5JflN5MBPL30oVsvnvEyp+18Nt3ZAErQMSFOfelCFvw0HcUloDayljZkX+MmamTAMTe+d+ltZ+1wEaRAX/MAnkJdcujzZyErIiVSzCEvIiq4O83AG7LAkwsfIgAnbncag82jfPPdd9RQyhPkpNJvKJWQBKlYFmQA315n4YPNjwMAZYy0TgAweedLmLzTJSTLIxkWDaVCVfAbbiKjytgmm+EGpMBYW0WwwbZ7lL8anox/UxekaOW544HO0ANAshxuORT/RG5YSrjlwZ3lM955tlQqbtVMlWIhjwzkAVFB8Q9EAAA3AFJ+DR3DO/Pnd3NPi7H117rAzWjpEs8vfIqsGZpaweOfEAAFJKuM0v6kf2iC5pZ9+fmLSZfWBVaKfLLNOXj6lYY0V2lfyVCIsVzmcRV9Y0fx02eTaEwhl2PDrXcjFdYRAohQmS8QEFLCLKGYA0AeEakhCCFDXqxsE0AQACgAQp5w96o0lAXuNASeDKWIvADiHwigfBINpWKtAXJvCEKWgSJNbRvxf4SmrnKDpvZavePu1K/zu/due1X/6Nj90MBd/J2Cic7WjBp/jUdIuA8AUtd65M+PzXIAAAAASUVORK5CYII="
        let a = document.createElement("a");
        a.href = "#";
        a.innerText = "Parent directory";
        a.style.paddingLeft = "8px";
        parentDir.append(img, a)
        let br = document.createElement("br");
        br.classList.add("remove");
        a.addEventListener("mouseup", () => {
            try {
                changePath(/.*(?=\/)/gm.exec(path)[0])
            } catch (TypeError) {
                changePath("");
            }
        })
        document.body.append(parentDir, br);
    }
    if (response.data.name !== undefined) {
        console.log(response.data.download_url)
        let rawFile = document.createElement("a")
        rawFile.href = response.data.html_url;
        rawFile.innerText = "View file on github";
        rawFile.classList.add("remove");
        let imgExtensions = [".png", ".gif", ".jpg", ".jpeg", "jpe", "jfif", ".svg"];
        let vidExtensions = [".mp4", ".webm", ".ogg"];
        let fileContents = null;
        for (let i = 0; i < imgExtensions.length; i++) {
            if (response.data.name.endsWith(imgExtensions[i])) {
                fileContents = document.createElement("img");
                fileContents.src = response.data.download_url;
                fileContents.style.display = "block";
            }
        }
        for (let i = 0; i < vidExtensions.length; i++) {
            if (response.data.name.endsWith(vidExtensions[i])) {
                fileContents = document.createElement("video");
                fileContents.toggleAttribute("controls", true)
                fileContents.style.display = "block";
                let src = document.createElement("source");
                src.src = response.data.download_url;
                src.type = "video/" + vidExtensions[i].replace(".", "");
                fileContents.appendChild(src);
            }
        }
        if (fileContents == null) {
            fileContents = document.createElement("pre");
            if (response.data.encoding === "base64") {
                fileContents.innerText = atob(response.data.content);
            }
        }
        fileContents.classList.add("remove");
        let br = document.createElement("br");
        br.classList.add("remove")
        document.body.append(rawFile, fileContents, br);
    } else {
        createTable()
    }
}

function addRow(table, values) {
    let row = document.createElement("tr");
    for (let i = 0; i < values.length; i++) {
        let v = document.createElement("td");
        let text = document.createElement("a");
        if (i === 0) {
            let src = values[2] === "File" ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABEElEQVR42nRRx3HDMBC846AHZ7sP54BmWAyrsP588qnwlhqw/k4v5ZwWxM1hzmGRgV1cYqrRarXoH2w2m6qqiqKIR6cPtzc3xMSML2Te7XZZlnW7Pe/91/dX47WRBHuA9oyGmRknzGDjab1ePzw8bLfb6WRalmW4ip9FDVpYSWZgOp12Oh3nXJ7nxoJSGEciteP9y+fH52q1euv38WosqA6T2gGOT44vry7BEQtJkMAMMpa6JagAMcUfWYa4hkkzAc7fFlSjwqCoOUYAF5RjHZPVCFBOtSBGfgUDji3c3jpibeEMQhIMh8NwshqyRsBJgvF4jMs/YlVR5KhgNpuBLzk0OcUiR3CMhcPaOzsZiAAA/AjmaB3WZIkAAAAASUVORK5CYII="
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVR42oxStZoWQRCs2cXdHTLcHZ6EjAwnQWIkJyQlRt4Cd3d3d1n5d7q7ju1zv/q+mh6taQsk8fn29kPDRo87SDMQcNAUJgIQkBjdAoRKdXjm2mOH0AqS+PlkP8sfp0h93iu/PDji9s2FzSSJVg5ykZqWgfGRr9rAAAQiDFoB1OfyESZEB7iAI0lHwLREQBcQQKqo8p+gNUCguwCNAAUQAcFOb0NNGjT+BbUC2YsHZpWLhC6/m0chqIoM1LKbQIIBwlTQE1xAo9QDGDPYf6rkTpPc92gCUYVJAZjhyZltJ95f3zuvLYRGWWCUNkDL2333McBh4kaLlxg+aTmyL7c2xTjkN4Bt7oE3DBP/3SRz65R/bkmBRPGzcRNHYuzMjaj+fdnaFoJUEdTSXfaHbe7XNnMPyqryPcmfY+zURaAB7SHk9cXSH4fQ5rojgCAVIuqCNWgRhLYLhJB4k3iZfIPtnQiCpjAzeBIRXMA6emAqoEbQSoDdGxFUrxS1AYcpaNbBgyQBGJEOnYOeENKR/iAd1npusI4C75/c3539+nbUjOgZV5CkAU27df40lH+agUdIuA/EAgDmZnwZlhDc0wAAAABJRU5ErkJggg=="
            let img = document.createElement("img");
            img.src = src;
            img.style.float = "left";
            v.appendChild(img);
            text.href = "#";
            text.addEventListener("mouseup", () => {
                if (currentPath === "") { changePath(values[i]) }
                else changePath(currentPath + "/" + values[i])
            })
        }
        text.innerText = values[i];
        text.style.float = "left";
        text.style.paddingLeft = "8px";
        v.appendChild(text);
        row.appendChild(v);
    }
    table.appendChild(row)
}

function addHeaders(table, headers) {
    let row = document.createElement("tr")
    for (let header of headers) {
        let h = document.createElement("th")
        h.style.cursor = "pointer";
        h.innerHTML = header;
        row.appendChild(h);
        if (header === "Name") {
            h.addEventListener('mouseup', () => {
                nameSort = toggleSort(nameSort);
                sortByName(files, nameSort);
                refreshTable(table);
            })
        } else if (header === "Size") {
            h.addEventListener('mouseup', () => {
                sizeSort = toggleSort(sizeSort);
                sortBySize(files, sizeSort);
                refreshTable(table);
            })
        } else if (header === "Type") {
            h.addEventListener('mouseup', () => {
                typeSort = toggleSort(typeSort);
                sortByType(files, typeSort);
                refreshTable(table);
            })
        }

    }
    table.appendChild(row)
}

function refreshTable(table) {
    resetFileView(table);
    displayHeaders(table);
    displayFiles(files);

}

function toggleSort(sort) {
    if (sort == null) {
        sort = true;
    } else {
        sort = !sort;
    }

    return sort;
}

/**
 * @param files The file array to sort
 * @param sort true (alphabetical) or false (reverse alphabetical)
 */
function sortByName(files, sort) {
    files.sort((file1, file2) => {
        let name1 = file1.name.toLowerCase();
        let name2 = file2.name.toLowerCase();
        return name1 < name2 ? -1 : 1
    })

    if (!sort) {
        files.reverse()
    }
}

/**
 * @param files The file array to sort
 * @param sort true (ascending) or false (descending)
 */
function sortBySize(files, sort) {
    files.sort((file1, file2) => {
        let size1 = file1.size;
        let size2 = file2.size;
        return size1 - size2;
    })

    if (!sort) {
        files.reverse()
    }
}

/**
 * @param files The file array to sort
 * @param sort true (ascending) or false (descending)
 */
function sortByType(files, sort) {
    files.sort((file1) => {
        let type1 = file1.type;
        return type1[0] === "d" ? -1 : 1
    })

    if (!sort) {
        files.reverse();
    }
}

let table = document.createElement("table")
let files = []; // File array

function displayHeaders(table) {
    addHeaders(table, ["Name", "Size", "Type"])
    document.body.appendChild(table)
}

function displayFiles(files) {
    files.forEach(file => {
        addRow(table, [file.name, file.type === "dir" ? "" : formatBytes(file.size), file.type === "file" ? "File" : "Folder"]);
    })
}

function createTable() {
    displayHeaders(table)
    for (let i = 0; i < response.data.length; i++) {
        files.push(new File(response.data[i].name, response.data[i].size, response.data[i].type));
    }

    displayFiles(files)
}

class File {
    constructor(name, size, type) {
        this.name = name; // Duplicate files are impossible: therefore names can be used as identifiers
        this.size = size;
        this.type = type;
    }
}

createTable()