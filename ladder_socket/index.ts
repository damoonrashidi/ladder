import express from 'express';
import io from 'socket.io';
import http from 'http';
import { BehaviorSubject } from 'rxjs';

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new http.Server(app);
const server = io(httpServer);

const responseSubject = new BehaviorSubject({
  isBusy: false,
  timestamp: new Date()
});

interface Busy {
  isBusy: boolean;
  timestamp: Date;
}

let currentValue: Busy;

responseSubject.subscribe(response => {
  server.sockets.emit('busy', response);
  currentValue = response;
});

app.get('/', (_, res) => {
  res.send(
    currentValue.isBusy
      ? `<h1>BUSY</h1></br><p>since: ${currentValue.timestamp}</p>`
      : `<h1>AVAILABLE</h1></br><p>since: ${currentValue.timestamp}</p>`
  );
});

server.sockets.on('connection', socket => {
  socket.emit('busy', currentValue);

  socket.on('busy', message => {
    if (typeof message === 'boolean') {
      responseSubject.next({
        isBusy: message,
        timestamp: new Date()
      });
    } else {
      console.log('Incorrect data: ', message);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
