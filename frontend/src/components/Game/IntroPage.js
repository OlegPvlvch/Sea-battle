import React from 'react';
import { Button, Alert } from 'react-bootstrap';


export default class IntroPage extends React.Component{

  handleClick = () => {
    window.location.assign('/games');
  }

  render(){
    return (
        <div className={"page-holder"}>
          <div className={"centered"}>
            <Alert variant="primary">
              <Alert.Heading>Welcome to the Sea Battle Game!</Alert.Heading>
              <hr />
              <h5>You may read <a 
                href={"https://www.thesprucecrafts.com/the-basic-rules-of-battleship-411069"} 
                target={"_blank"}>the rules</a> before you started playing.</h5>
              <Button 
                variant="danger"
                onClick={() => this.handleClick()} 
              block>
                Play
              </Button>
            </Alert>
          </div>
        </div>
    )
  }
}