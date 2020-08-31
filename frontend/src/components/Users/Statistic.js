import React from 'react';
import { userService } from '../services/userService';
import { Container, Row, Col } from 'react-bootstrap';
import TopPanel from '../Game/TopPanel';


export default class Statistic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      games_count: '',
      wins_count: '',
    }
  }

  componentDidMount(){
    userService.getStat()
    .then((res) => {
      this.setState({
        username: res.data.username,
        games_count: res.data.games_count,
        wins_count: res.data.wins_count,
      })
    })
  }

  render(){
    return (
      <Container>
        <TopPanel />
        <Row>
          <Col xs={1}></Col>
          <Col>
              <h2>Your statistic, {this.state.username}.</h2> <hr />
              <h4>Games: {this.state.games_count}</h4>
              <h4>Wins: {this.state.wins_count}</h4>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    )
  }
}