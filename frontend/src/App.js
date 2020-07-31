import React, { Component } from 'react';
import './App.css';


class App extends Component{
  render(){
    return (
      <div>
        <form>
          <input type='text' name='username'></input><br/>
          <input type='password' name='password'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default App;
