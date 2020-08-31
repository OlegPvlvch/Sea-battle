import React from 'react';
import Logout from '../Users/Logout';
import { Button } from 'react-bootstrap';


export default function TopPanel(){
  return (
    <div>
      <Button variant="link" href={"/games"}>Games</Button>
      <Button variant="link" href={"/game_create"}>Create game</Button>
      <Button variant="link" href={"/statistic"}>Statistic</Button>
      <Logout />
      <hr />
    </div>
  )
}