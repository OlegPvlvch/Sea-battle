import React from 'react';
import Field from './Field';
import getShipSet from '../helpers/getShipSet'
import { webSocketServiceInstance } from '../services/webSocketService';
import { gameService } from '../services/gameService';
import currentUser from '../helpers/currentUser';

import checkAvailableCells from '../helpers/checkAvailableCells';
import makeAureole from '../helpers/makeAureole';


export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.room_id = props.match.params.room_id;
      this.webSocketServ = webSocketServiceInstance;
      this.shipsData = [
        [1, 4, 'fourdeck'], 
        [2, 3, 'threedeck'],
        [3, 2, 'twodeck'], 
        [4, 1, 'onedeck'],
      ];
      this.state = {
        playerShips: getShipSet(this.shipsData),
        playerField: [],
        enemyField: [],
        canMove: true,
        currentShipIndex: 0,
        availableCells: [],
        isReady: false, 
        status: '',
      };
      this.getWebSocket();
    }

    getWebSocket = () => {
      this.webSocketServ.connect(this.room_id);
      this.webSocketServ.socket.onmessage = (e) => {
        this.handleMessage(JSON.parse(e.data));
      }
    }

    getGameInfo = () => {
      gameService.getGameInfo(this.room_id)
      .then(res => {
        this.setState({
          status: res.data.status,
        })
      });
    }

    componentDidMount(){
      this.getGameInfo();
      setTimeout(() => {
        if(this.webSocketServ.state() === 1) {
          this.webSocketServ.getFieldsData();
        }
      }, 200);
    }
    
    componentWillUnmount(){
      this.webSocketServ.disconnect();
    }

    handleMessage(data){
      switch(data['action']){
        case 'get_fields_data':
          this.setState({
            isReady: this.state.isReady || data['player_field']['has_ships'],
            playerField: data['player_field']['player_fieldmap'],
            enemyField: data['enemy_field']['enemy_fieldmap'],
          });
          break;
        case 'set_field':
          if(this.state.isReady) this.webSocketServ.getFieldsData();
          this.getGameInfo();
          break;
        case 'move':
          let flag = data['info']['hit'];
          this.setState({
            canMove: data['sender'] === currentUser() ? flag : !flag,
          });
          this.webSocketServ.getFieldsData();
          break;
        default:
          console.log(data);
          break;
      }
    }
  
    handleClick(i, j){
      if(this.state.isReady && this.state.canMove && this.state.status === 'started'){
        if(!this.state.enemyField[i][j]['shot']){
          this.webSocketServ.move(i,j);
        }
      }
    }

    setShips(i, j){
      if(!this.state.isReady){
        let field = this.state.playerField.slice();
        let ships = this.state.playerShips.slice();
        let ind = this.state.currentShipIndex;
        let ship_matrix = ships[ind].matrix;
        let ship_decks = ships[ind].decks;
        let cells = this.state.availableCells;
        if(field[i][j].containsShip || field[i][j].isOccupied) return;
        if(cells.length > 0 && !cells.some((el) => el[0] === i && el[1] === j)){
          return;
        }
        ship_matrix.push([i,j]);
        cells = checkAvailableCells(
          this.state.playerField, i, j, ships[ind]
        ).filter(cell => cell !== undefined);
        // console.log(cells);
        if(ship_decks > 1 && ship_matrix.length !== ship_decks && cells.length === 0){
          ship_matrix.pop();
          return;
        }
        field[i][j].containsShip = true;
        field[i][j].isVisible = true;
        this.setState({
          playerField: field,
          playerShips: ships,
          availableCells: cells,
        });
        if(this.state.playerShips[ind].matrix.length === this.state.playerShips[ind].decks){
          this.setState({
            currentShipIndex: ind+1,
            playerField: makeAureole(field, ships[ind]),
            availableCells: [],
          });
          // console.log(ships[ind]);
        }
        if(this.state.currentShipIndex >= this.state.playerShips.length - 1){
          this.webSocketServ.setField(this.state.playerField);
          this.setState({
            isReady: true,
          });
        }
      }
    }
  
    render(){
      
      return (
        <div className="container">
          <h3>Status: {this.state.status}</h3><hr />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <div className="game">
                <Field whose={currentUser() || 'Player'} 
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