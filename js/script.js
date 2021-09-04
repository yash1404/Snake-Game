// variable declared...

let inputdir = { x: 0, y: 0 }
let speed = 12;
let lastpainttime = 0;
let snakearray = [
  { x: 13, y: 15 }
]
let food = {
  x: 10, y: 6
}

let score = 0;

// this logic is for rendering the display 

const main = (ctime) => {
  window.requestAnimationFrame(main);
  // console.log(ctime)

  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }

  lastpainttime = ctime;
  gameengine();

}
function iscollapse(sarray) {
  // if you bump yourself

  for (let i = 1; i < snakearray.length; i++) {
    if (sarray[i].x === sarray[0].x && sarray[i].y === sarray[0].y) {
      return true;
    }
  }
  // if you bump into wall
  if (sarray[0].x >= 18 || sarray[0].x <= 0 || sarray[0].y >= 18 || sarray[0].y <= 0) {
    return true;
  }
}

function gameengine() {
  // updating snake array and food

  if (iscollapse(snakearray)) {
    inputdir = { x: 0, y: 0 };
    alert(" Game Over,press any key to play again! ");
    snakearray = [{ x: 13, y: 15 }];
    score = 0;
  }

  // if snake eaten the food ..regenrate the food and increment the score..
  if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
    score += 1;

    // if score is greater than highscore..record break point.
    if (score > hiscorevalue) {
      hiscorevalue = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
      highscore.innerHTML = `HighScore:${hiscorevalue}`

    }
    scorebox.innerHTML = `Score:${score}`;
    // adding the snake body in sanke
    snakearray.unshift({
      x: snakearray[0].x + inputdir.x,
      y: snakearray[0].y + inputdir.y
    })

    // generating  random food coordinates
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    };

  }

  // moving the snake
  for (let i = snakearray.length - 2; i >= 0; i--) {
    snakearray[i + 1] = { ...snakearray[i] };
  };

  snakearray[0].x += inputdir.x;
  snakearray[0].y += inputdir.y;


  // display snake 
  board.innerHTML = "";
  snakearray.forEach((e, ind) => {
    snakeelement = document.createElement('div');
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;

    if (ind === 0) {
      snakeelement.classList.add("head")
    }
    else {
      snakeelement.classList.add("snakebody")
    }

    board.appendChild(snakeelement);

  })

  // display food
  foodelement = document.createElement('div');
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food")
  board.appendChild(foodelement);

}


// setting highscore in local storage..

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscorevalue = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
}
else {
  hiscorevalue = JSON.parse(hiscore)
  highscore.innerHTML = `HighScore:${hiscore}`
}
// main logic starts here...
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 0 }   // start the game..

  switch (e.key) {

    case "ArrowUp":
      //  console.log("ArrowUp");
      inputdir.x = 0;
      inputdir.y = -1;
      break;

    case "ArrowDown":
      inputdir.x = 0;
      inputdir.y = 1;
      // console.log("ArrowDown");
      break;

    case "ArrowRight":
      inputdir.x = 1;
      inputdir.y = 0;
      // console.log("ArrowRight");
      break;


    case "ArrowLeft":
      inputdir.x = -1;
      inputdir.y = 0;
      // console.log("ArrowLeft");
      break;

    default:
      break;
  }
});