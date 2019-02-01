import express from "express";
import io from "socket.io";
import http from "http";
import { BehaviorSubject } from "rxjs";

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new http.Server(app);
const server = io(httpServer);

const responseSubject = new BehaviorSubject({
  isBusy: false,
  timestamp: new Date().toTimeString()
});

interface Available {
  isBusy: boolean;
  timestamp: string;
}

let currentValue: Available;

responseSubject.subscribe(response => {
  server.sockets.emit("available", response);
  currentValue = response;
});

app.get("/", (_, res) => {
  res.send(
    currentValue.isBusy
      ? `<h1>AVAILABLE</h1></br><h3>since: ${currentValue.timestamp}</h3>`
      : `<h1>BUSY</h1>`
  );
});

server.sockets.on("connection", socket => {
  socket.emit("available", currentValue);

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

httpServer.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
