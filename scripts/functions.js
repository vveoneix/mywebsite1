let mobile = window.matchMedia("(max-width: 768px)")
const tiles = ["tile-butters", "tile-mystery", "tile-github"]

function getRandInt(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function printWord(){
    let word = adjectives[getRandInt(0,1317)];
    let color = colors[getRandInt(0,11)];
    let mark = punctuation[getRandInt(0,3)];
    document.write('<b id="randword" style="color: ' + color + '" onclick="changeWord()">' + word + mark + '</b>');
}

function changeWord(){
    let word = adjectives[getRandInt(0,1317)];
    let color = colors[getRandInt(0,11)];
    let mark = punctuation[getRandInt(0,3)];
    document.getElementById("randword").innerHTML = '<b class="fade-in" id="randword" style="color: ' + color + '" onclick="changeWord()">' + word + mark + '</b>'
}

window.addEventListener("load",function(){
    if(mobile.matches){
        tiles.forEach(element => {
            if(isOnScreen(element, 10)){
                playAnimation(element);
            }else{
                stopAnimation(element);
            }
        });
    }
    else{
        if(isOnScreen("three-tiles")){
            tiles.forEach(element => {
                playAnimation(element);
            });
        }
        else{
            tiles.forEach(element => {
                stopAnimation(element);
            });
        }
    }
})

window.addEventListener("scroll",function(){
    if(mobile.matches){
        tiles.forEach(element => {
            if(isOnScreen(element, 30)){
                playAnimation(element);
            }
        });
    }
    else{
        if(isOnScreen("three-tiles")){
            tiles.forEach(element => {
                playAnimation(element);
            });
        }
    }
})

function isOnScreen(element, percentage = 35) {
    let el = document.getElementById(element);
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    let isVisible = (elemBottom <= window.innerHeight * (1 + percentage * 0.01));
    return isVisible;
}

function playAnimation(element){
    document.getElementById(element).classList.remove("pauseanimation");
}

function stopAnimation(element){
    document.getElementById(element).classList.add("pauseanimation");
}