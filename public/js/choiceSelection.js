var nextButton = document.getElementById("next-btn")

function selectButton(btn){
    var selection = document.getElementById(btn);
    selection.className = "selected";
    nextButton.style.visibility = "visible";
    selection.firstElementChild.style.display = "block";
}

// $('.available').on("click", () => {
//     $('this').removeClass("available");
//     $('this').addClass("selected");
// });
