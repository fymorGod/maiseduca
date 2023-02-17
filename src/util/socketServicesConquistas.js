import io from "socket.io-client";

const SOCKET_URL = "http://192.168.6.20:3011/conquistas";

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });
      console.log("initializing socket");

      this.socket.on("connect", (data) => {
        console.log("===socket on - Conquistas===");
      });

      this.socket.on("disconnect", (data) => {
        console.log("===socket disconnect===");
      });

      this.socket.on("error", (data) => {
        console.log("socket error", data);
      });
    } catch (error) {
      console.log("error is socket", error);
    }
  };

  emit(event, data, cb = {}) {
    this.socket.emit(event, data, cb);
  }

  on(event, cb = {}) {
    this.socket.on(event, cb);
  }

  remove(listenerName) {
    this.socket.remove(listenerName);
  }
}

const socketServicesConquistas = new WSService();

export default socketServicesConquistas;
