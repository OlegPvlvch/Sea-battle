import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { userService } from '../services/userService';


export default class Auth extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      isLoggenIn: Boolean(localStorage.getItem('user')),
    };
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e){
    e.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    if(!(username && password)){
      this.setState({
        error: 'Invalid data',
      })
    }
    else{
      userService.login(username, password)
      .then(() => {
        this.setState({
          isLoggenIn: true,
        })
      })
      .catch((err) => {
        if(err.response.status === 403){
          this.setState({
            error: 'You are already logged in. Please log out.',
            isLoggenIn: false,
          })
        }
        else if(err.response.status === 400){
          this.setState({
            error: 'Invalid data',
            isLoggenIn: false,
          })
        }
      });
    }
  }

  render(){
    return(
      <Container>
        <Row>
          <Col xs={0} sm={2} md={3} lg={3}></Col>
          <Col xs={12} sm={10} md={6} lg={6}>
            {this.state.isLoggenIn ? (
              <Redirect to='/games' />
            ) : (
            <div>
              <h4>Sign in</h4><hr />
              <p>{this.state.error}</p>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="username" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Sign in</button>
                </div>
              </form>
              <Link to="/register">Don't have an account?</Link>
            </div>
            )}
          </Col>
          <Col xs={0} sm={2} md={3} lg={3}></Col>
        </Row>
      </Container>
    )
  }
}