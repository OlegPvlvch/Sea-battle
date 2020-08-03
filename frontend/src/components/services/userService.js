import axios from 'axios';
import authHeader from "../helpers/authHeader";


const API_URL = 'http://127.0.0.1:8000/users/';


export const userService = {
    register,
    login,
    logout,
    getStat,
};

function register(username, password){
    return axios({
        method: 'post',
        url: `${API_URL}create/`,
        data: {
            'username':username,
            'password':password,
        }
    })
    //.then((res) => console.log(res.data))
    //.catch((err) => {return err.message});
}

function login(username, password){
    return axios({
        method: 'post',
        url: `${API_URL}login/`,
        data: {
            'username':username,
            'password':password,
        }
    })
    .then((res) => {
        if(res.data.token){
            localStorage.setItem('User', username);
            localStorage.setItem('Token', res.data.token);
        }
    })
}

function logout(){
    axios({
        method: 'post',
        url: `${API_URL}logout/`,
        headers: authHeader(),
    })
    .then(() => {
        localStorage.removeItem("User");
        localStorage.removeItem("Token");
    })
    //.catch(err => {console.log(err.message)});
    //localStorage.removeItem("Token");
}

function getStat(){}