const score = document.querySelector('.score');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.querySelector('.overlay');
const reset = document.querySelector('.reset');
const overlayScore = document.querySelector('.overlay-score');
const startGameInfo = document.querySelector('.start-game');
const backgroundMusic = document.getElementById('background-music');
const gameOverMusic = document.getElementById('game-over-music');

let countScore = 0;
let startGame = true;
let timerVerifyDead;
let timerScore;
let timerSpeed;

startGameInfo.innerHTML = 'Pressione qualquer tecla para iniciar <br/> O tempo é contabilizado a cada segundo';

reset.addEventListener('click', () => window.location.reload());

const startGameAndJump = () => {
  if (!pipe.classList.contains('pipeRun')) {
    pipe.classList.add('pipeRun');
  }

  mario.classList.add('jump');

  setTimeout(() => mario.classList.remove('jump'), 500);

  if (startGame) {
    let pipeSpeed = 1.5;
    startGameInfo.innerHTML = '';
    startGameInfo.style.background = 'transparent';

    timerScore = setInterval(() => {
      countScore++;
      score.innerHTML = `SCORE ${countScore}`;
    }, 1000);

    timerSpeed = setInterval(() => {
      pipeSpeed -= 0.1;
      if (pipeSpeed < 0.6) {
        pipeSpeed = 0.6; // Definir velocidade mínima do pipe
      }
      console.log({ pipeSpeed });

      // Para alterar a duração da animação sem interrompê-la
      pipe.style.animationDuration = `${pipeSpeed}s`;

    }, 10000); // Corrigido para 10000ms (10 segundos)
  }

  startGame = false;

  timerVerifyDead = setInterval(() => {
    handleLogicForGameOver();
  }, 10);
};

window.addEventListener('keypress', startGameAndJump);
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    startGameAndJump();
  }
});
window.addEventListener('touchstart', startGameAndJump);

const handleLogicForGameOver = () => {
  const pipeLocalization = pipe.offsetLeft;
  const marioLocalization = +window
    .getComputedStyle(mario)
    .bottom.replace('px', '');

  if (
    pipeLocalization <= 120 &&
    pipeLocalization > 0 &&
    marioLocalization < 80
  ) {
    pipe.classList.remove('pipeRun');
    pipe.style.left = `${pipeLocalization}px`;

    mario.src = '../assets/game-over-1.png';
    mario.style.marginLeft = '50px';
    mario.style.bottom = `-200px`;
    mario.style.width = '80px';
    mario.classList.add('dead');

    overlayScore.innerHTML = `SCORE ${countScore}`;
    overlay.style.display = 'flex';

    clearInterval(timerScore);
    clearInterval(timerVerifyDead);
    clearInterval(timerSpeed);

    backgroundMusic.pause();
    gameOverMusic.play();
  }
};
