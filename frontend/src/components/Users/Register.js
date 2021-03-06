import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { userService } from '../services/userService';
import { Container, Row, Col } from 'react-bootstrap';


export default class Register extends React.Component{
  constructor(props){
    super(props);
    this.regexp = new RegExp('[A-Za-z0-9_]');
    this.state = {
      username: '',
      password: '',
      password2: '',
      error: '',
      registerSuccess: false,
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
    const password2 = this.state.password2;

    if(!this.regexp.exec(username) || !this.regexp.exec(password)){
      this.setState({
        error: 'Fields may contain only letters, digits and underscore'
      });
    }
    else if(password !== password2){
      this.setState({error: "Passwords didn't match",});
      return;
    } else {
      userService.register(username, password2)
      .then(() => {
        this.setState({
          error: '',
          registerSuccess: true,
        })
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.username,
        })
      });
    }
  }

  render(){
    return(
      <Container>
        <Row>
          <Col xs={0} sm={2} md={3} lg={3}></Col>
          <Col xs={12} sm={10} md={6} lg={6}>
            {this.state.registerSuccess ? (
            <Redirect to='/login' />
            ) : (
            <div>
            <h4>Sign up</h4><hr />
            <p>{this.state.error}</p>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" onChange={(e) => this.handleChange(e)} required></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={(e) => this.handleChange(e)} required></input>
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm password</label>
                <input type="password" className="form-control" name="password2" onChange={(e) => this.handleChange(e)} required></input>
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Sign up</button>
              </div>
            </form>
            <Link to="/login">Already have an account?</Link>
            </div>
            )}
          </Col>
          <Col xs={0} sm={2} md={3} lg={3}></Col>
        </Row>
      </Container>
    );
  }
}