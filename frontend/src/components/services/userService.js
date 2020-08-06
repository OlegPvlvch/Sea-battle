import authHeader from "../helpers/authHeader";
import getAxiosInstance from '../helpers/getAxiosInstance';


const axiosInstance = getAxiosInstance();

export const userService = {
  register,
  login,
  logout,
  getStat,
};

function register(username, password){
  return axiosInstance({
    method: 'post',
    url: 'users/create/',
    data: {
      'username':username,
      'password':password,
    }
  })
}

function login(username, password){
  return axiosInstance({
    method: 'post',
    url: 'users/login/',
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
    url: 'users/logout/',
    headers: authHeader(),
  })
  localStorage.removeItem("User");
  localStorage.removeItem("Token");
}

function getStat(){
  return axiosInstance({
    method: 'get',
    url: 'users/stat/',
    headers: authHeader()
  })
}