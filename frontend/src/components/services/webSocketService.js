class webSocketService{
  constructor(){
    this.socket = null;
    this.ws_api_url = "ws://127.0.0.1:8000/ws/";
  }

  connect(room_id){
    const path = `${this.ws_api_url}${room_id}/?token=${localStorage.getItem('Token')}`;
    this.socket = new WebSocket(path);
    this.socket.onopen = () => {
      console.log(`WebSocket for room ${room_id} opened`);
    };
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

  move(i, j){
    this.socket.send(JSON.stringify({
      'command':'move',
      'coords': {
        'i': i,
        'j': j,
      }
    }))
  }

  setField(fieldmap){
    this.socket.send(JSON.stringify({
      'command':'set_field',
      'fieldmap':fieldmap,
    }))
  }

  getFieldsData(){
    this.socket.send(JSON.stringify({
      'command':'get_fields_data'
    }))
  }

  state(){
    return this.socket.readyState;
  }
}

export const webSocketServiceInstance = new webSocketService();