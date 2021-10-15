<<<<<<< Updated upstream
=======
const scorpion = {
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fire', 'kunai spear'],
  attack: function() {
    console.log(scorpion.name + ' Fight...');
  }
}

const subzero = {
  name: 'Sub Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['water', 'ice'],
  attack: function() {
    console.log(subzero.name + ' Fight...');
  }
}

const $arenas = document.querySelector('.arenas');

function createPlayer(player, playerObject) {

  const $player1 = document.createElement('div');
  $player1.classList.add(player);

  const $progressBar = document.createElement('div');
  $progressBar.classList.add('progressbar');

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = playerObject.hp + '%';

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = playerObject.name;

  $progressBar.appendChild($life);
  $progressBar.appendChild($name);

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $img = document.createElement('img');
  $img.src = playerObject.img;

  $character.appendChild($img);

  $player1.appendChild($progressBar);
  $player1.appendChild($character);

  $arenas.appendChild($player1);

}

createPlayer('player1', scorpion);
createPlayer('player2', subzero);
>>>>>>> Stashed changes
