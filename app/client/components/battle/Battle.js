import React from 'react';
import { render } from 'react-dom';

import Game from './game';

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game(this.props.hero, this.props.enemy)
    }
  }

  render(){
    console.log(this.props.enemy.status, "ENEMY status")
    var style = {height:"100px",width:"140px",overflow:"auto",border:"8px solid red",padding:"2%"}
    return(
      <div>
        <progress id="enemyHealth" value={this.props.enemy.status.health} max="100">Enemy bar</progress>
        <div style= {style}>
          orders to anything in HTML - including scroll boxes.
        </div>
        <progress id="heroHealth" value={this.props.hero.status.health} max="100"></progress>
        <div onClick = {attack.bind(this)}>
          Attack!
        </div>
        <div>
          Defend!
        </div>
        <div>
          Items
        </div>
        <div>
          Cry
        </div>
        <div>
          MAGIC?!
        </div>
    </div>
    )
  }
}

function attack() {
  this.props.hero.performAction =
    this.props.attack.bind(null,10,this.props.hero, this.props.enemy);
  this.state.game.nextTurn();
}