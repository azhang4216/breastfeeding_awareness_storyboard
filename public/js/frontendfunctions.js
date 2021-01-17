var modal = document.getElementById("splash");
var span = document.getElementsByClassName("close")[0];



function fadeOutEffect() {
    var fadeTarget = modal;
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 25);
}

span.addEventListener('click', fadeOutEffect);
