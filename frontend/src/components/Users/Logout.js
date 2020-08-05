import React from 'react';
import { userService } from '../services/userService';


export default class Logout extends React.Component{
    handleClick(){
        userService.logout();
        window.location.reload();
    }
    
    render() {
        return (
            <button className="btn btn-dark" onClick={() => this.handleClick()}>
                Logout
            </button>
        )
    }
}