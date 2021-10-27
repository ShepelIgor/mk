export class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
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
}
