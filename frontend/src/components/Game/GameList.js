import React from 'react';
import Logout from '../Users/Logout';
import { gameService } from '../services/gameService';
import GameJoin from './GameJoin';


export default class GameList extends React.Component{
  constructor(props){
  super(props);
  this.state = {
    games: [],
  };
  }

  componentDidMount(){
  gameService.getGameList()
  .then((res) => {
    this.setState({
    games: res.data,
    })
  });
  }

  render(){
  return (
    <div>
    <a className="btn" href="/game_create">Create game</a>
    <Logout />
    <hr />
    <div className="row">
      <div className="cols-sm-2 col-md-3"></div>
      <div className="col-xs-12 col-sm-8 col-md-6">
      <ul className="list-group">
        {this.state.games.map((item, index) => {
        return (
          <li key={index} className="list-group-item">
            <GameJoin 
              room_id={item.id} 
              button_value={`Room ${item.id}. Size: ${item.size}x${item.size}`} 
            />
          </li>
        )
        })}
      </ul>
      </div>
      <div className="cols-sm-2 col-md-3"></div>
    </div>
    </div>
  )
  }
}