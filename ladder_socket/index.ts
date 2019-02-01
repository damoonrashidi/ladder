import io from "socket.io";
import http from "http";
import { BehaviorSubject } from "rxjs";

const responseSubject = new BehaviorSubject({
  isBusy: false,
  timestamp: new Date().toTimeString()
});

const httpServer = new http.Server();

const server = io(httpServer);

responseSubject.subscribe(response => {
  server.sockets.emit("available", response);
});

server.sockets.on("connection", socket => {
  socket.emit("available", "You are connected!");

  socket.on("available", message => {
    if (typeof message === "boolean") {
      responseSubject.next({
        isBusy: message === true,
        timestamp: new Date().toTimeString()
      });
    } else {
      console.log("Incorrect data: ", message);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
