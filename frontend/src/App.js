import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from './components/Game/Game';
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import Logout from './components/Users/Logout'


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/game" component={Game} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Router>
    );
  }
}

export default App;