import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/users/';


export default class UserService{
    constructor(){}

    register(username, password){
        let data = {};
        axios.post(
            `${API_URL}create/`, 
            data={'username':username, 'password':password})
        .then(res => {data = res.data})
        .catch(err => {console.log(err)});

        if(data) return data;

        return;
    }

    login(username, password){
        let data = {};
        axios.post(
            `${API_URL}login/`,
            data={'username':username, 'password':password})
        .then(res => {data = res.data})
        .catch(err => {console.log(err)});
        if(data.get('Token')){
            localStorage.setItem('Token', data['Token']);
        }
        //return data;
    }

    logout(){
        const token = localStorage.getItem('Token');
        const headers = {
            "Authorization":"Token "+token,
        }
        axios.post(
            `${API_URL}logout/`,
            headers=headers
        )
        .then(res => res.data)
        .catch(err => {console.log(err)});
        localStorage.removeItem("Token");
    }
    
    getStat(){}
}