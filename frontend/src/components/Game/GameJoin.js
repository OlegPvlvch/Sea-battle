import React from 'react';
import { Button } from 'react-bootstrap';
import { gameService } from '../services/gameService';


export default class GameJoin extends React.Component{
  constructor(props){
    super(props);
    this.room_id = props.room_id;
    this.button_value = props.button_value;
  }

  handleClick(){
    gameService.joinGame(this.room_id)
    .then(() => {
      window.location.assign(`game/${this.room_id}`);
    })
    .catch(err => {
      alert(err.response.data.error);
    });
  }

  render(){
    return (
      <Button variant="outline-dark" onClick={() => this.handleClick()} block>
        {this.button_value}
      </Button>
    )
  }
}