var ship = document.getElementById("ship");
var aliens = document.querySelectorAll(".alien");

var x = 47;
var y = 90;

ship.style.left = x + "vw";
ship.style.top = y + "vh";

var alienX = 0;
var alienY = 5;

aliens.forEach(function (alien) {
    var alienRect = alien.getBoundingClientRect();
    if (alienX > 90) {
        alienX = 0;
        alienY += 10;
    }
    alien.style.left = alienX + "vw";
    alien.style.top = alienY + "vh";
    
    alienX += 10;

});


document.onkeydown = function (event) {
    if (event.key === "ArrowLeft" && x > 0) 
        x = x - 1;
    else if (event.key === "ArrowRight" && x < 95)
        x = x + 1;

    if (event.key === "ArrowUp" && y > 0) 
        y = y - 1;
    else if (event.key === "ArrowDown" && y < 90)
        y = y + 1;

    ship.style.left = x + "vw";
    ship.style.top = y + "vh";

    // Verificar colisión con cada alien
    aliens.forEach(function (alien) {
        var alienRect = alien.getBoundingClientRect();
        var shipRect = ship.getBoundingClientRect();

        if (
            shipRect.x < alienRect.x + alienRect.width &&
            shipRect.x + shipRect.width > alienRect.x &&
            shipRect.y < alienRect.y + alienRect.height &&
            shipRect.y + shipRect.height > alienRect.y
        ) {
            alien.src = "images/explosion.png";
            ship.src = "images/explosion.png";

            setTimeout(function () {
                ship.style.display = "none";
                alien.style.display = "none";
            }, 2000);
        }
    });

};

