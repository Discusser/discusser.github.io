window.onload = () => {
    window.setInterval(function() {
        let img = document.createElement("img")
        img.src = "https://github.com/GTNewHorizons/GT5-Unofficial/blob/b3c3b9c5d7d0f40404f702b849d46f348cd78a9c/src/main/resources/assets/gregtech/textures/items/gt.metaitem.01/415.png?raw=true"
        document.body.appendChild(img)
        document.body.appendChild(document.createElement("br"))
        console.log("hi")
    }, 10)

}