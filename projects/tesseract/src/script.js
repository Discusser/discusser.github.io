window.onload = () => {
    window.setInterval(function() {
        for (let i = 0; i < 188; i++) {
            let img = document.createElement("img")
            img.src = "./images/frame_" + ("000" + i).slice(-3) + "_delay-0.03s.png"
            document.body.appendChild(img)
            document.body.appendChild(document.createElement("br"))
        }
    }, 100)
}