import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Game from './components/Game/Game';
import Register from './components/Users/Register';
import Login from './components/Users/Login';


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;