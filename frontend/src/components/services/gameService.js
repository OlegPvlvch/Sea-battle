import getAxiosInstance from '../helpers/getAxiosInstance';
import authHeader from '../helpers/authHeader';


const axiosInstance = getAxiosInstance();

export const gameService = {
  getGameList,
  createGame,
  getGameInfo,
  joinGame,
};

function getGameList(){
  return axiosInstance({
    method: 'get',
    url: 'games/',
    headers: authHeader(),
  });
}

function createGame(size){
  return axiosInstance({
    method: 'post',
    url: 'games/create/',
    headers: authHeader(),
    data: {
      'size': size,
    }
  })
}

function getGameInfo(id){
  return axiosInstance({
    method: 'get',
    url: `games/${id}/`,
    headers: authHeader(),
  })
}

function joinGame(id){
  return axiosInstance({
    method: 'post',
    url: `games/${id}/join/`,
    headers: authHeader(),
  })
}