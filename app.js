const score = document.getElementById('score');
const gamemenu = document.getElementById('gamemenu');
const gamearea = document.getElementById('gamearea');
//gamearea.style.display = "none";

const player = { speed:5.5, score, dificulty: 3 };
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}
document.addEventListener('keydown', (e) => {                  //if anyone press key
    e.preventDefault();

    keys[e.key] = true;


})
document.addEventListener('keyup', (e) => {              //if anyone release key
    e.preventDefault();

    keys[e.key] = false;


})
function repeatline() {
    let roadline = document.querySelectorAll(".roadline");
    for (i = 0; i < 5; i++) {
        if (roadline[i].y >= 700)
            roadline[i].y -= 700
        roadline[i].y += 5
        roadline[i].style.top = roadline[i].y + "px";
    }
}
function iscolide(car, enemy) {
    poscar = car.getBoundingClientRect();
    posenemy = enemy.getBoundingClientRect();
    return !((poscar.top > posenemy.bottom) || (poscar.bottom < posenemy.top) || (poscar.left > posenemy.right) || (poscar.right < posenemy.left))
}
function endgame() {
    console.log("Hit");
    player.start = false;
    gamemenu.innerHTML=`Your score is ${player.score} <br>Press enter to Restart`

    gamemenu.style.display = "block"

}
function enemycarproduce(car) {
    let enemycar = document.querySelectorAll(".enemycar");
    for (i = 0; i < 4; i++) {
        if (iscolide(car, enemycar[i])) {
            endgame()

        }

        if (enemycar[i].y >= 700) {
            enemycar[i].style.left = (Math.random() * 350) + "px";
            enemycar[i].y -= 700
        }

        enemycar[i].y += player.speed
        enemycar[i].style.top = enemycar[i].y + "px";

    }
}

function gameplay() {

    let car = document.querySelector('.car');
    let score = document.getElementById('score');
    let pos = gamearea.getBoundingClientRect();


    //console.log(pos);

    if (player.start == true) {
        if (keys.ArrowUp && player.y > pos.top + 120) { player.y = player.y - 5; }
        if (keys.ArrowDown && player.y < (pos.bottom - 110)) { player.y = player.y + 5; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= 5; }
        if (keys.ArrowRight && player.x < pos.width - 58) { player.x += 5; }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";


        repeatline();
        enemycarproduce(car);
        player.score++;
        score.innerHTML = `Score:${player.score}`




        window.requestAnimationFrame(gameplay);
    }

}
gamemenu.addEventListener('click', () => {

    gamemenu.style.display = "none";
    gamearea.innerHTML = "";
    player.score = 0;


    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gamearea.appendChild(car);

    for (i = 0; i < 5; i++) {
        var roadline = document.createElement('div');
        roadline.setAttribute('class', 'roadline');
        gamearea.appendChild(roadline);
        roadline.y = 150 * i;
        roadline.style.top = roadline.y + "px";
    }
    for (i = 0; i < 4; i++) {
        var enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemycar');
        gamearea.appendChild(enemycar);
        enemycar.y = ((i+1)*160)*-1;
        enemycar.style.top = enemycar.y + "px";
        enemycar.style.left = (Math.random() * 350) + "px";
    }




    player.start = true;
    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    window.requestAnimationFrame(gameplay);
});


