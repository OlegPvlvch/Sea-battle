import React from 'react';
import { Button } from 'react-bootstrap';
import { userService } from '../services/userService';


export default class Logout extends React.Component{
  handleClick(){
    userService.logout();
    window.location.reload();
  }
  
  render() {
    return (
      <Button variant="dark" onClick={() => this.handleClick()}>
        Logout
      </Button>
    )
  }
}