import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { PrivateRoute } from './components/helpers/PrivateRoute';
import GameList from './components/Game/GameList';
import Game from './components/Game/Game';
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import Statistic from './components/Users/Statistic';

import GameCreate from './components/Game/GameCreate';


class App extends Component {
  render() {
    return (
      <Router>
          {/*  component={()=><Page prop={} /> } */}
        <PrivateRoute path="/games" component={GameList} />

        <PrivateRoute path="/room/:room_id" component={Game}/>

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/statistic" component={Statistic} />
        <PrivateRoute path="/game_create" component={GameCreate} />
      </Router>
    );
  }
}

export default App;