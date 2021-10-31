import { createElement } from './utils.js'

export class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.rootSelector = props.rootSelector;
    this.avatar = props.avatar;
  }
  changeHP = (amount) => {
    if (this.hp - amount <= 0) {
      this.hp = 0;
    } else {
      this.hp -= amount;
    }
  }
  elHP = () => document.querySelector(`.player${this.player} .life`);
  renderHP = () => this.elHP().style.width = this.hp + '%';
  createPlayer = () => {
    const $player = createElement('div', 'player' + this.player);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = this.hp + '%';
    $name.innerText = this.name;
    $img.src = this.img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressBar);
    $player.appendChild($character);
    return document.querySelector(`.${this.rootSelector}`).appendChild($player);
  }
}
