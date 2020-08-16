import React from 'react';
import { gameService } from '../services/gameService';


export default class GameJoin extends React.Component{
  constructor(props){
    super(props);
    this.room_id = props.room_id;
    this.button_value = props.button_value;
  }

  handleClick(){
    gameService.joinGame(this.room_id)
    .then(res => {
      window.location.assign(`room/${this.room_id}`);
    })
    .catch(err => {
      alert(err.response.data.error);
    });
  }

  render(){
    return (
      <button className="btn btn-outline-dark btn-block"
        onClick={() => this.handleClick()}
      >
        {this.button_value}
      </button>
    )
  }
}