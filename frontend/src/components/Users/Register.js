import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/userService';


export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            error: '',
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
        const password2 = this.state.password2;

        if(!(username && password && password2)){
            this.setState({error: 'All fields are required',});
            return;
        } else if(password !== password2){
            this.setState({error: 'Confirm password',});
            return;
        } else {
            this.setState({error: '',});
            userService.register(username, password2);
        }
    }

    render(){
        return(
            
            <div className="col-md-6 col-md-offset-3">
             <h4>Sign up</h4><hr />
            <p>{this.state.error}</p>
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
                    <label htmlFor="password2">Confirm password</label>
                    <input type="password" className="form-control" name="password2" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Sign up</button>
                </div>
             </form>
             <Link to="/login">Already have an account?</Link>
            </div>
        )
    }
}