import { getRandom, createReloadButton, $formFight } from './utils.js';
import { generateLogs, renderLogs } from './logs.js';
import { isWinner, enemyAttack, playerAttack } from './combat.js';
import { Player } from './classes.js'

let player;
let enemy;

//comment and go to the best
//want to commint with description
//try again

export default class Game {

  getEnemy = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    return body;
  };

  getPlayer = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    return body;
  };

  madeFight = async (hit, defence) => {
    const body = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
      method: 'POST',
      body: JSON.stringify({
        hit,
        defence
      })
    }).then(res => res.json());
    return body;
  };

  start = async () => {

    const enemies = await this.getEnemy();
    const players = await this.getPlayer();

    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = enemies;
    player = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas'
    })
    enemy = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas'
    })

    const { hp: playerHP } = player;
    const { hp: enemyHP } = enemy;

    function showResult() {
      if (playerHP === 0 && playerHP < enemyHP) {
        isWinner(enemy);
      } else if (enemyHP === 0 && enemyHP < playerHP) {
        isWinner(player);
      } else if (playerHP === 0 && enemyHP === 0) {
        isWinner();
      }
    }

    player.createPlayer();
    enemy.createPlayer();

    renderLogs(generateLogs('start', player, enemy));
    // const test = await this.madeFight('head','head');

    $formFight.addEventListener('submit', async (e) => {

      e.preventDefault();


      const { hit: playerHitTo, defence: playerDefenceTo } = playerAttack();

      let resp = await this.madeFight(playerHitTo, playerDefenceTo);

      const { value: enemyHitValue, hit: enemyHit, defence: enemyDefence } = resp.player2;
      const { value: playerHitValue, hit: playerHit, defence: playerDefence } = resp.player1;

      if (enemyHit !== playerDefence) {
        player.changeHP(enemyHitValue);
        player.renderHP();
        renderLogs(generateLogs('hit', enemy, player, enemyHitValue));
      } else {
        renderLogs(generateLogs('defence', enemy, player));
      }
      if (playerHit !== enemyDefence) {
        enemy.changeHP(playerHitValue);
        enemy.renderHP();
        renderLogs(generateLogs('hit', player, enemy, playerHitValue));
      } else {
        renderLogs(generateLogs('defence', player, enemy));
      }

      if (player.hp === 0 || enemy.hp === 0) {
        if (player.hp === 0) {
          isWinner(enemy);
          renderLogs(generateLogs('end', enemy, player));
        } else if (enemy.hp === 0) {
          isWinner(player);
          renderLogs(generateLogs('end', player, enemy));
        } else {
          renderLogs(generateLogs('draw'));
        }

        $formFight[6].disabled = true;
        createReloadButton();
      }

      showResult();

    })

  }
}
