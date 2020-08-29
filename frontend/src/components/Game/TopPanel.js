import React from 'react';
import Logout from '../Users/Logout';


export default function TopPanel(props){
  return (
    <div>
      <a className="btn" href="/game_create">Create game</a>
      <a className="btn" href="/statistic">Statistic</a>
      <Logout />
      <hr />
    </div>
  )
}