import React from 'react';
import Field from './Field';
import getEmptyField from '../helpers/getEmptyField';
import getShipSet from '../helpers/getShipSet'
//import checkAvailableCells from '../helpers/checkAvailableCells';

import Logout from '../Users/Logout';


export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.size = 10;
      this.shipsData = [
        //amount, length, name
        [1, 4, 'fourdeck'], [2, 3, 'threedeck'],
        [3, 2, 'twodeck'], [4, 1, 'onedeck'],
      ];
      this.state = {
        playerField: getEmptyField(this.size),
        playerShips: getShipSet(this.shipsData),

        currentIndex: 0,
        availableCells: [],
        
        enemyField: getEmptyField(this.size),
        //enemyShips: [],
        gameStarted: false, 
        gameOver: false,
      };
      console.log(this.state.playerShips)
    }
  
    handleClick(i, j){
      if(this.state.gameStarted){
        let field = this.state.enemyField.slice();
        if(!field[i][j].shot)
          field[i][j].shot = true;
          this.setState({
            enemyField: field,
          })
      }
    }

    setShips(i, j){
      if(!this.state.gameStarted){
        let field = this.state.playerField.slice();
        //field[i][j].isVisible = true;
        //field[i][j].containsShip = true;
        this.setState({
          playerField: field,
        });
        //----
      }
    }
  
    render(){
      
      return (
        <div className="container">
        <div class="nav">
          <Logout />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="game">
              <Field whose={localStorage.getItem('User') || 'Player'} 
                fieldMap={this.state.playerField}
                onClick={(i, j) => this.setShips(i, j)} 
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="game">
              <Field whose={"Enemy"}
                fieldMap={this.state.enemyField}
                onClick={(i, j) => this.handleClick(i, j)}
              />
            </div>
          </div>
        </div>
        </div>
      );
    }
  }