import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
      <Container>
        <h3 className={"text-center"}>Create game!</h3> <hr />
        <Row>
          <Col xs={0} sm={2} md={3} lg={3}></Col>
          <Col xs={12} sm={10} md={6} lg={6}>
            <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
              <select className="form-control" onChange={(e) => this.handleChange(e)}>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
              </select> <br />
              <button className={"btn btn-primary btn-block"}>Create</button>
            </form>
          </Col>
          <Col xs={0} sm={2} md={3} lg={3}></Col>
        </Row>
     </Container>
    )
  }
}