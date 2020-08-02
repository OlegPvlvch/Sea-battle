import React from 'react';
import { Link } from 'react-router-dom';


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
        } else if(password !== password2){
            this.setState({error: 'Confirm password',});
        } else {
            this.setState({error: '',});
        }

        //auth...
    }

    render(){
        return(
            
            <div className="col-md-6 col-md-offset-3">
             <h4>Sign up</h4><hr />
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
                    <label htmlFor="password2">Password</label>
                    <input type="password" className="form-control" name="password2" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <button className="btn">Sign up</button>
                </div>
             </form>
             <Link to="/login">Already have an account?</Link>
            </div>
        )
    }
}