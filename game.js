import { createPlayer, createReloadButton, showResult, $arenas, $formFight } from './utils.js';
import { generateLogs, renderLogs } from  './logs.js';
import { player1 as player, player2 as enemy} from './player.js';
import { isWinner, enemyAttack, playerAttack } from './combat.js';

export default class Game {
  start = () => {

    $arenas.appendChild(createPlayer(player));
    $arenas.appendChild(createPlayer(enemy));

    renderLogs(generateLogs('start', player, enemy));

    $formFight.addEventListener('submit', function(e) {

      e.preventDefault();

      const {value: enemyHitValue, hit: enemyHit, defence: enemyDefence} = enemyAttack();
      const {value: playerHitValue, hit: playerHit, defence: playerDefence} = playerAttack();

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
