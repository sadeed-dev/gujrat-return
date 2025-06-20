// server.js
import { createServer } from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import { setupSocket, setIOInstance } from './sockets/index.js';
import { setupChatSocket } from './sockets/chat.js';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', // Replace with frontend origin in production
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  },
});

// Set the io instance globally inside sockets/index.js
setIOInstance(io);
setupSocket(io);



// after io is created:
setupChatSocket(io);

httpServer.listen(5000, () => {
  console.log('Server is running on port 5000');
});
