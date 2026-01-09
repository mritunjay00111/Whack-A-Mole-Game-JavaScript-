const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

const timeRange = { minTime: 1000, maxTime: 1200 };

let lastHole = null;
let gameOver = true;
let score = 0;
let peepTimeout = null;

function randomTime(minTime, maxTime) {
  return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
}

function randomHole(holes) {
  let holeidx;
  do {
    holeidx = Math.floor(Math.random() * holes.length);
  } while (holeidx === lastHole);

  lastHole = holeidx;
  return holes[holeidx];
}

function peep() {
  if (gameOver) return;

  const time = randomTime(timeRange.minTime, timeRange.maxTime);
  const hole = randomHole(holes);
  hole.classList.add("up");

  peepTimeout = setTimeout(() => {
    hole.classList.remove("up");
    peep();
  }, time);
}

function boop(e) {
  if (!e.isTrusted) return;

  const hole = this.parentElement;
  if (!hole.classList.contains("up")) return;

  score++;
  hole.classList.remove("up");
  scoreBoard.textContent = score;
}

function startGame() {
  clearTimeout(peepTimeout);

  holes.forEach((hole) => hole.classList.remove("up"));

  score = 0;
  scoreBoard.textContent = "0";
  lastHole = null;
  gameOver = false;

  peep();

  setTimeout(() => {
    gameOver = true;
    clearTimeout(peepTimeout);
    holes.forEach((hole) => hole.classList.remove("up"));
  }, 10000);
}

moles.forEach((mole) => mole.addEventListener("click", boop));
