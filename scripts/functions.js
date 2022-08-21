let mobile = window.matchMedia("(max-width: 768px)")
let root = document.querySelector(":root");
const tiles = ["#tile-butters", "#tile-mystery", "#tile-github"];

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
    animateTiles(true);
    animateSections(true);
})

window.addEventListener("scroll",function(){
    animateTiles();
    animateSections();
})

function animateTiles(enableStop = false){
    if(mobile.matches){
        tiles.forEach(element => {
            console.log(document.querySelector(element));
            if(isOnScreen(document.querySelector(element))){
                playAnimation(document.querySelector(element));
            }
            else if(enableStop){
                stopAnimation(document.querySelector(element));
            }
        });
    }
    else{
        if(isOnScreen(document.querySelector("#three-tiles"))){
            tiles.forEach(element => {
                playAnimation(document.querySelector(element));
            });
        }
        else if(enableStop){
            tiles.forEach(element => {
                stopAnimation(document.querySelector(element));
            });
        }
    }
}

function animateSections(enableStop = false){
    let sections = document.querySelectorAll("section");
    sections.forEach(element => {
        if(isOnScreen(element)){
            playAnimation(element);
        }
        else if(enableStop){
            stopAnimation(element);
        }
    });
}

function isOnScreen(element, percentage = 10) {
    let rect = element.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    let isVisible = (elemTop <= window.innerHeight * (1 - percentage * 0.01));
    return isVisible;
}

function playAnimation(element){
    element.classList.remove("pauseanimation");
}

function stopAnimation(element){
    element.classList.add("pauseanimation");
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