import { isWinner } from './combat.js';

export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');
export const $arenas = document.querySelector('.arenas');

export const getRandom = (num) => Math.ceil(Math.random() * num);

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  className && $tag.classList.add(className);
  return $tag;createPlayer
}

export const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Restart';
  $reloadWrap.appendChild($reloadButton);
  $reloadWrap.addEventListener('click', function() {
    window.location.reload();
  })
  $arenas.appendChild($reloadWrap);
}
