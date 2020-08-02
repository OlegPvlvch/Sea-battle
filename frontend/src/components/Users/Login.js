import React from 'react';
import { Link } from 'react-router-dom';


export default class Auth extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e){
        e.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        if(!(username && password)){
            return;
        }

        //auth...
    }

    render(){
        return(
            
            <div className="col-md-6 col-md-offset-3">
             <h4>Sign in</h4><hr />
             <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <button className="btn">Sign up</button>
                </div>
             </form>
             <Link to="/register">Don't have an account?</Link>
            </div>
        )
    }
}