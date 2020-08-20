//import authHeader from '../helpers/authHeader';


export default class webSocketService{
  constructor(){
    this.socket = null;
    this.ws_api_url = "ws://127.0.0.1:8000/ws/";
  }

  connect(room_id, customMessageCallback=null){
    const path = `${this.ws_api_url}${room_id}/?token=${localStorage.getItem('Token')}`;
    this.socket = new WebSocket(path);
    this.socket.onopen = () => {
      console.log(`WebSocket for room ${room_id} opened`);
    };

    // this.socket.onmessage = e => {
    //   //this.defaultMessageCallback(e.data);
    //   customMessageCallback ? 
    //   customMessageCallback(e.data) : 
    //   this.defaultMessageCallback(e.data);
    // }

    this.socket.onerror = e => {
      console.log(e.message);
    };
    this.socket.onclose = () => {
      console.log('WebSocket closed!');
    };
  }

  disconnect(){
    console.log('Disconnected!')
    this.socket.close();
  }

  sendGameData(data){
    this.socket.send(JSON.stringify(data));
  }

  getField(){
    this.socket.send(JSON.stringify({
      'command':'get_fields_data'
    }))
  }

  defaultMessageCallback(data){
    console.log(data);
    return data;
  }

  state(){
    return this.socket.readyState;
  }
}