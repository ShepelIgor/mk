import { player1 as player, player2 as enemy } from './player.js';
import { isWinner } from './combat.js';

export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');
export const $arenas = document.querySelector('.arenas');

export const getRandom = (num) => Math.ceil(Math.random() * num);

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  className && $tag.classList.add(className);
  return $tag;
}

export function createPlayer(playerObject) {

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

export function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Restart';
  $reloadWrap.appendChild($reloadButton);
  $reloadWrap.addEventListener('click', function() {
    window.location.reload();
  })
  $arenas.appendChild($reloadWrap);
}

const { hp: playerHP } = player;
const { hp: enemyHP } = enemy;

export function showResult() {
  if (playerHP === 0 && playerHP < enemyHP) {
    isWinner(enemy);
  } else if (enemyHP === 0 && enemyHP < playerHP) {
    isWinner(player);
  } else if (playerHP === 0 && enemyHP === 0) {
    isWinner();
  }
}
