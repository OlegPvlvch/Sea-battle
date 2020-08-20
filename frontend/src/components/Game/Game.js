import React from 'react';
import Field from './Field';
import getShipSet from '../helpers/getShipSet'
import webSocketService from '../services/webSocketService';
import { gameService } from '../services/gameService';


export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.room_id = props.match.params.room_id;
      //this.size = 10;
      this.webSocketServ = null;
      this.shipsData = [
        [1, 4, 'fourdeck'], 
        [2, 3, 'threedeck'],
        [3, 2, 'twodeck'], 
        [4, 1, 'onedeck'],
      ];

      this.state = {
        playerField: [],
        playerShips: getShipSet(this.shipsData),

        current: 0,
        //availableCells: [],
        
        enemyField: [],
        //enemyShips: [],
        isReady: false, 
        gameOver: false,
      };

      this.getWebSocket();
    }

    getWebSocket(){
      this.webSocketServ = new webSocketService();
      this.webSocketServ.connect(this.room_id);
      this.webSocketServ.socket.onmessage = (e) => {
        this.handleMessage(JSON.parse(e.data));
      }
    }

    componentDidMount(){
      gameService.getGameInfo(this.room_id)
      .then((res) => {
        console.log(res.data);
      });

      setTimeout(() => {
        if(this.webSocketServ.state() === 1) {
          this.webSocketServ.getField();
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
            //isReady: true,
            playerField: data['player_field'],
            enemyField: data['enemy_field']
          });
          break;
        default:
          console.log(data);
          break;
      }
    }
  
    handleClick(i, j){
      if(this.state.isReady){
        const field = this.state.enemyField.slice();
        if(!field[i][j]['shot'])
          field[i][j]['shot'] = true;
          this.setState({
            enemyField: field,
          })
      }
    }

    setShips(i, j){
      //this.webSocketServ.getField();
      this.webSocketServ.sendGameData({
        'command': 'send_data',
        'message': 'hey'
      })

      if(!this.state.isReady){
        let field = this.state.playerField.slice();
        let ships = this.state.playerShips.slice();//[ind];
        let ind = this.state.current;

        if(ind >= this.state.playerShips.length - 1){
          gameService.setField(
            this.room_id, this.state.playerField
          ).then(() => {
            this.setState({
              isReady: true,
            });
          })
        }
        if(field[i][j].containsShip || field[i][j].isOccupied) return;
        // if(ships[ind].matrix !== []){
        //   if(ships[ind].matrix.length === 2){
        //     ships[ind].matrix[0][0] === ships[ind].matrix[1][0] ? 
        //     ships[ind].setHorizontal(1) : ships[ind].setHorizontal(0);
        //   }
        // }
        ships[ind].matrix.push([i,j]);
        // let cells = checkAvailableCells(this.state.playerField, i, j, ships[ind]);
        field[i][j].containsShip = true;
        field[i][j].isVisible = true;
        this.setState({
          playerField: field,
          playerShips: ships,
        });
        if(this.state.playerShips[ind].matrix.length === this.state.playerShips[ind].decks){
          this.setState({
            current: ind+1,
          });
          console.log(ships[ind]);
        }
        
        
      }
    }
  
    render(){
      
      return (
        <div className="container">
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