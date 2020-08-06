import React from 'react';
import { userService } from '../services/userService';


export default class Statistic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            games_count: '',
            wins_count: '',
        }
    }

    componentDidMount(){
        userService.getStat()
        .then((res) => {
            this.setState({
                username: res.data.username,
                games_count: res.data.games_count,
                wins_count: res.data.wins_count,
            })
        })
    }

    render(){
        return (
            <div className="row">
              <div className="col">
                <h3>{this.state.username}</h3> <hr />
                <p>Games: {this.state.games_count}</p>
                <p>Wins: {this.state.wins_count}</p>
              </div>
            </div>
        )
    }
}