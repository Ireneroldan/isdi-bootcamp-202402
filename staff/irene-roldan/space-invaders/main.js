var ship = document.getElementById("ship")
var alien = document.querySelector("alien")

var x = 47
var y = 90


ship.style.left = x + "vw";
ship.style.top = y + "vh";


document.onkeydown = function (event) {
    if (event.key === "ArrowLeft" && x > 0) 
        x = x - 1
    else if (event.key === "ArrowRight" && x < 95)
        x = x + 1

    if (event.key === "ArrowUp" && y > 0) 
        y = y - 1
    else if (event.key === "ArrowDown" && y < 90)
        y = y + 1
    
    ship.style.left = x + "vw";
    ship.style.top = y + "vh";

    var shipRect = ship.getBoundingClientRect()
    var alienRect = alien.getBoundingClientRect()

    console.log(shipRect, alienRect);

    if (shipRect.x + alienRect.width > alienRect.x) {
        ship.src = "images/explosion.png"
        alien.src = "images/explosion.png"

        setTimeout(function () {
            ship.style.display = "none"
            alien.style.display = "none"
        }, 2000);
    }
}


