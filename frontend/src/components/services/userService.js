import axios from 'axios';
import authHeader from "../helpers/authHeader";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/users/'
});

export const userService = {
    register,
    login,
    logout,
    getStat,
};

function register(username, password){
    return axiosInstance({
        method: 'post',
        url: 'create/',
        data: {
            'username':username,
            'password':password,
        }
    })
}

function login(username, password){
    return axiosInstance({
        method: 'post',
        url: 'login/',
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
    axiosInstance({
        method: 'post',
        url: 'logout/',
        headers: authHeader(),
    })
    .then(() => {
        localStorage.removeItem("User");
        localStorage.removeItem("Token");
    })
    //.catch(err => {console.log(err.message)});
    //localStorage.removeItem("Token");
}

function getStat(){
    return axiosInstance({
        method: 'get',
        url: 'stat/',
        headers: authHeader()
    })
}