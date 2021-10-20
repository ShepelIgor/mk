const $arenas = document.querySelector('.arenas');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const $formFight = document.querySelector('.control');

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fire', 'kunai spear'],
  attack: function() {
    console.log(scorpion.name + ' Fight...');
  },
  changeHP,
  elHP,
  renderHP
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
  changeHP,
  elHP,
  renderHP
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
  $arenas.appendChild($winTitle);
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Restart';
  $reloadWrap.appendChild($reloadButton);
  $reloadWrap.addEventListener('click', function() {
    window.location.reload();
  })
  $arenas.appendChild($reloadWrap);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
}

$formFight.addEventListener('submit', function(e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  if (enemy.hit != attack.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
  }
  console.dir($formFight);
  if (attack.hit != enemy.defence) {
    player2.changeHP(attack.value);
    player2.renderHP();
  }

  if (player1.hp === 0 || player2.hp === 0) {

    $formFight([6]).disabled = true;
    // or
    // $fightButton = document.querySelector('.button');
    // $fightButton.disabled = true;
    // but i think there's another method to get button from $formFight, but i can't find it
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    isWinner(player2);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    isWinner(player1);
  } else if (player1.hp === 0 && player2.hp === 0) {
    isWinner();
  }

})
