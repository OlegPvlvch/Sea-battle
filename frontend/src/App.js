import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { PrivateRoute } from './components/helpers/PrivateRoute';
import IntroPage from './components/Game/IntroPage';
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
        <div>
          <Route exact path="/" component={IntroPage} />
          <PrivateRoute exact path="/games" component={GameList} />
          <PrivateRoute path="/game/:room_id" component={Game}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/statistic" component={Statistic} />
          <PrivateRoute path="/game_create" component={GameCreate} />
        </div>
      </Router>
    );
  }
}

export default App;