import React from 'react';
import Field from './Field';
import start_fill from '../helpers/started_filling';


class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        playerField: [],
        playerShips: [],
        enemyField: [],
        //enemyShips: [],
        gameStarted: false,
        gameOver: false,
      };
  
      start_fill(this.state.enemyField);
      start_fill(this.state.playerField);
    }
  
    handleClick(y, x){
      if(this.state.gameStarted){
        let field = this.state.enemyField.slice();
        if(!field[y][x].isVisible)
          field[y][x].isVisible = true;
          this.setState({
            enemyField: field,
          })
      }
    }
  
    setShips(y, x){
      if(!this.state.gameStarted){
        let field = this.state.playerField.slice();
        field[y][x].containsShip = true;
        this.setState({
          playerField: field,
        })
      }
    }
  
    render(){
      
      return (
        <div>
        <div className="game">
          <Field whose={"Player"} 
            fieldMap={this.state.playerField}
            //onClick={(y, x) => this.setShips(y, x)} 
          />
        </div>
        <div className="game">
          <Field whose={"Enemy"}
            fieldMap={this.state.enemyField}
            onClick={(y, x) => this.handleClick(y, x)}
          />
        </div>
        </div>
      );
    }
  }

export default Game;