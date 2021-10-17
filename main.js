const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Scorpion',
  loser: false,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fire', 'kunai spear'],
  attack: function() {
    console.log(scorpion.name + ' Fight...');
  }
}

const player2 = {
  player: 2,
  name: 'Sub Zero',
  loser: false,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['water', 'ice'],
  attack: function() {
    console.log(subzero.name + ' Fight...');
  }
}

function randomTwenty() {
  const random = Math.ceil(Math.random() * 20);
  return random;
}

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  className && $tag.classList.add(className);
  return $tag;
}

function createPlayer(playerObject) {

  const $player = createElement('div', 'player' + playerObject.player);
  const $progressBar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');


  $life.style.width = playerObject.hp + '%';
  $name.innerText = playerObject.name;
  $img.src = playerObject.img;

  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);
  $player.appendChild($progressBar);
  $player.appendChild($character);
  return $player;

}

function lossHP(player) {
  const $playerLife = document.querySelector('.player' + player.player + ' .life');
  player.hp > 0 ? player.hp -= randomTwenty() : player.hp = 0;
  $playerLife.style.width = player.hp + '%';
  if (player.hp === 0) {
    $randomButton.disabled = true;
  }
}

function isWinner(player) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = player.name + ' win';
    return $winTitle;
}

$randomButton.addEventListener('click', function() {
  lossHP(player1);
  lossHP(player2);
  if (player1.hp === 0) {
    $arenas.appendChild(isWinner(player2));
  } else if (player2.hp === 0) {
    $arenas.appendChild(isWinner(player1));
  }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
