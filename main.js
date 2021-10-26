const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};



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
  const $winTitle = createElement('div', 'loseTitle');
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

function playerAttack() {
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

  return attack;
}

function showResult() {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    isWinner(player2);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    isWinner(player1);
  } else if (player1.hp === 0 && player2.hp === 0) {
    isWinner();
  }
}

const time = new Date().toLocaleTimeString(['ru-RU'], {
  hour: '2-digit',
  minute: '2-digit'
});

function generateLogs(type, player1, player2, hp) {
  switch (type) {
    case 'start':
      return logs[type].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', time);
    case 'end':
      return logs[type][getRandom(2)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
    case 'draw':
      return logs[type];
    case 'defence':
      return `${time}:${logs[type][getRandom(7) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} [${player2.hp}/100]`;
    default:
      return `${time}:${logs[type][getRandom(17) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} -${hp} [${player2.hp}/100]`;
  }
}

function renderLogs(text) {
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el)
}

renderLogs(generateLogs('start', player1, player2));

$formFight.addEventListener('submit', function(e) {

  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    renderLogs(generateLogs('hit', player2, player1, enemy.value));
  } else {
    renderLogs(generateLogs('defence', player2, player1));
  }
  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    renderLogs(generateLogs('hit', player1, player2, player.value));
  } else {
    renderLogs(generateLogs('defence', player1, player2));
  }

  if (player1.hp === 0 || player2.hp === 0) {
    if (player1.hp === 0) {
      isWinner(player2);
      renderLogs(generateLogs('end', player2, player1));
    } else if (player2.hp === 0) {
      isWinner(player1);
      renderLogs(generateLogs('end', player1, player2));
    } else {
      renderLogs(generateLogs('draw'));
    }

    $formFight[6].disabled = true;
    createReloadButton();
  }

  showResult();

})
