var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var allScore = JSON.parse(localStorage.getItem("allScore"))||[]


clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

highScore.innerHTML = allScore