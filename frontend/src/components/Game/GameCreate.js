import React from 'react';
import { gameService } from '../services/gameService';


export default class CreateGame extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      room_id: 0,
      size: 10,
      success: false,
    }
  }

  handleChange(e){
    const value = e.target.value;
    this.setState({ size: value });
  }

  handleSubmit(e){
    e.preventDefault();
    gameService.createGame(this.state.size)
    .then((res) => {
      this.setState({
        room_id: res.data.room_id,
        success: true,
      });
      window.location.replace(`game/${this.state.room_id}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  render(){
    return(
     <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
       <select className="form-control" onChange={(e) => this.handleChange(e)}>
        <option>10</option>
        <option>11</option>
        <option>12</option>
        <option>13</option>
        <option>14</option>
        <option>15</option>
      </select>
      <button className="btn btn-primary">Create!</button>
     </form>
    )
  }
}