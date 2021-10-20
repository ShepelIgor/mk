const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fire', 'kunai spear'],
  attack: function() {
    console.log(scorpion.name + ' Fight...');
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
}

const player2 = {
  player: 2,
  name: 'Sub Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['water', 'ice'],
  attack: function() {
    console.log(subzero.name + ' Fight...');
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
}

function getRandom(num) {
  const random = Math.ceil(Math.random() * num);
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

function changeHP(amount) {
  if (this.hp - amount <= 0) {
    this.hp = 0;
  } else {
    this.hp -= amount;
  }
}

function elHP() {
  const $getPlayer = document.querySelector('.player' + this.player + ' .life');
  return $getPlayer;
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

function isWinner(player) {
    const $winTitle = createElement('div', 'winTitle');
    if (player) {
      $winTitle.innerText = player.name + ' win';
    } else {
      $winTitle.innerText = 'draw';
    }
    return $winTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $reloadWrap.addEventListener('click', function() {
      window.location.reload();
    })
    return $reloadWrap;
}

$randomButton.addEventListener('click', function() {
  player1.changeHP(getRandom(20));
  player1.renderHP();
  player2.changeHP(getRandom(20));
  player2.renderHP();
  console.log(player1.hp + '--vs--' + player2.hp);
  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(isWinner(player2));
    $arenas.appendChild(createReloadButton());
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(isWinner(player1));
    $arenas.appendChild(createReloadButton());
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(isWinner());
    $arenas.appendChild(createReloadButton());
  }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
