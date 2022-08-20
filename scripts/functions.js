let mobile = window.matchMedia("(max-width: 768px)")
let root = document.querySelector(":root");
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

function changeTheme(theme) {
    let bg = Math.floor(Math.random() * themes[theme][4] ) + 1;
    let background = "url(images/" + themes[theme][0] + "/" + themes[theme][0] + bg + ".png)";
    let body = document.querySelector("body");
    
    body.classList.remove('fade-in');
    void body.offsetWidth;
    body.classList.add('fade-in');

    root.style.setProperty('--accent1', themes[theme][1]);
    root.style.setProperty('--accent2', themes[theme][2]);
    root.style.setProperty('--bgdark', themes[theme][3]);
    root.style.setProperty('--welcomebg', background);
    root.style.setProperty('--theme', theme);
    document.querySelectorAll('.thing').forEach(element => {
        element.innerHTML = themes[theme][0];
    });
}

function randomTheme() {
    let newTheme;
    do {
        newTheme = getRandInt(0,themes.length)
    }
    while(newTheme == getComputedStyle(root).getPropertyValue('--theme'))
    changeTheme(newTheme);
}