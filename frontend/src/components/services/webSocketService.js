export default class webSocketService{
  constructor(){
    this.socket = null;
    this.ws_api_url = "ws://127.0.0.1:8000/ws/";
  }

  connect(room_name){
    const path = `${this.ws_api_url}${room_name}/`;
    this.socket = new WebSocket(path);
    this.socket.onopen = () => {
      console.log(`WebSocket for ${room_name} room opened`);
    };
    this.socket.onmessage = (e) => {
      this.sendGameData(e.data);
    }
    this.socket.onerror = e => {
      console.log(e.message);
    };
    this.socket.onclose = () => {
      console.log('WebSocket closed!');
    };
  }

  disconnect(){
    console.log('Disconnected. Good bye!')
    this.socket.close();
  }

  sendGameData(data){
    console.log(data);
    this.socket.send(JSON.stringify(data));
  }
}