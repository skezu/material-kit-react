import { useEffect } from 'react';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { withIronSession } from 'next-iron-session';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req, res) => {
  if (!res.socket.server.io) {
    const httpServer = createServer((req, res) => {
      res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
      res.end('hello world\n');
    });

    const io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('message', (data) => {
        console.log('Received data:', data);
        // handle incoming data here...
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    httpServer.listen(3001, () => {
      console.log('WebSocket server listening on port 3001');
    });
  } else {
    console.log('WebSocket server already running');
  }

  res.end();
};

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
