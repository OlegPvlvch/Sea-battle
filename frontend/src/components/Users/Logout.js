import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from '../services/userService';


export default class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logoutSuccess: false,
        };
    }

    handleLogout(){
        userService.logout()
        .then(() => {
            this.setState({
                logoutSuccess: true,
            })
        })
        .catch((err) => {
            console.log(err);
            // this.setState({
            //     logoutSuccess: false,
            // })
        })
    }

    render(){
        return (
            <div>
             {this.state.logoutSuccess ? (
                <Redirect to="/game" />
             ) : (
                <div>
                    <button type="button" onClick={() => this.handleLogout()}>
                        Logout
                    </button>
                </div>
             )}
            </div>
        );
    }

}