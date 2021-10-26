export const player1 = {
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

export const player2 = {
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

export function changeHP(amount) {
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

export function renderHP() {
  this.elHP().style.width = this.hp + '%';
}
