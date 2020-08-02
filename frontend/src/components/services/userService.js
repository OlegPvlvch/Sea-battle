import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/users/';


export default class UserService{
    constructor(){}

    register(username, password){
        axios.post(
            `${API_URL}create/`, 
            data={'username':username, 'password':password})
        // Нужно получить объект res.data и вернуть его например
        .then((res) => {console.log(res.data); return res.data})
        .catch((err) => {console.log(err.message, err.response.data)});
    }

    login(username, password){
        axios.post(
            `${API_URL}login/`,
            data={'username':username, 'password':password})
        .then((res) => {return res.data})

        .then((res_data) => {
            if(res_data.token){
                localStorage.setItem('Token', res_data.token);
            }
        })
        .catch((err) => {console.log(err.message, err.response.data)});
    }

    logout(){
        axios.post(
            `${API_URL}logout/`,
            headers = getAuthHeader()
        )
        .then(res => res.data)
        .catch(err => {console.log(err.message)});
        localStorage.removeItem("Token");
    }

    getStat(){}
}

function getAuthHeader(){
    return {
        "Authorization":"Token "+localStorage.getItem('Token')
    };
}