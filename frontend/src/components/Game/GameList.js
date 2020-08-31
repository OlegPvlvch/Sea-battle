import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import TopPanel from './TopPanel';
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
    <Container>
      <TopPanel />
      <Row>
        <Col sm={1} md={2}></Col>
        <Col xs={12} sm={10} md={8}>
          <ListGroup>
            {this.state.games.map((item, index) => {
            return (
              <ListGroup.Item variant="dark" key={index}>
                <GameJoin 
                  room_id={item.id} 
                  button_value={`Room ${item.id}. Size: ${item.size}x${item.size}`} 
                />
              </ListGroup.Item>
            )
            })}
          </ListGroup>
        </Col>
        <Col sm={1} md={2}></Col>
      </Row>
    </Container>
  )
  }
}