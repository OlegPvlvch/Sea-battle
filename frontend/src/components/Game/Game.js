import React from 'react';
import Field from './Field';
import getShipSet from '../helpers/getShipSet'
import webSocketService from '../services/webSocketService';
import { gameService } from '../services/gameService';
import currentUser from '../helpers/currentUser';
import checkAvailableCells from '../helpers/checkAvailableCells';
import makeAureole from '../helpers/makeAureole';


export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.room_id = props.match.params.room_id;
      this.webSocketServ = new webSocketService();
      this.shipsData = [
        [1, 4, 'battleship'], 
        [2, 3, 'cruiser'],
        [3, 2, 'destroyer'], 
        [4, 1, 'vedette'],
      ];
      this.state = {
        playerShips: getShipSet(this.shipsData),
        playerField: [],
        enemyField: [],
        canMove: true,
        isReady: false,
        isEnded: false, 
        currentShipIndex: 0,
        availableCells: [],
        status: '',
        info: '',
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
      return gameService.getGameInfo(this.room_id)
      .then(res => {
        let status = res.data.status;
        this.setState({
          status: status,
          isEnded: status === 'ended',
        })
      })
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
          let has_ships_flag = data['player_field']['has_ships'];
          this.setState({
            isReady: has_ships_flag && !this.state.isEnded,
            canMove: data['player_field']['can_move'],
            playerField: data['player_field']['player_fieldmap'],
            enemyField: data['enemy_field']['enemy_fieldmap'],
          });
          if(this.state.status === 'started' && !this.state.isEnded){
            this.setState({
              info: this.state.canMove ? 'Your move' : "Enemy's move",
            })
          }
          break;
        case 'set_field':
          this.getGameInfo()
          .then(() => {
            this.webSocketServ.getFieldsData();
          })
          break;
        case 'move':
          this.webSocketServ.getFieldsData();
          break;
        case 'end_game':
          this.getGameInfo();
          this.setState({
            canMove: false,
            isEnded: true,
            info: `Winner: ${data['sender']}`
          });
          break;
        default:
          console.log(data);
          break;
      }
    }
  
    handleClick(i, j){
      if(this.state.canMove && this.state.status === 'started'){
        if(!this.state.enemyField[i][j]['shot']){
          this.webSocketServ.move(i,j);
        }
      }
    }

    setShips(i, j){
      if(!this.state.isReady && !this.state.isEnded){
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
            info: `Arrange the ships (${ind+1}/${ships.length})`
          });
        }
        if(this.state.currentShipIndex >= this.state.playerShips.length - 1){
          this.webSocketServ.setField(this.state.playerField);
          this.setState({
            isReady: true,
            info: '',
          });
        }
      }
    }
  
    render(){
      
      return (
        <div className="container game-container">
          <h3>Status: {this.state.status}</h3><hr />
          {this.state.info ? (
            <h5>{this.state.info}</h5>
          ) : (
            ''
          )}
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