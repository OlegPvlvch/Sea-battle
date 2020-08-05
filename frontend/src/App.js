import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from './components/helpers/PrivateRoute';
import Game from './components/Game/Game';
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import Statistic from './components/Users/Statistic';


class App extends Component {
  render() {
    return (
      <Router>
              {/*  component={()=><Page prop={} /> } */}
        <PrivateRoute path="/game" component={Game} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/statistic" component={Statistic} />
      </Router>
    );
  }
}

export default App;