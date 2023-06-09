const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const http = require('http');
const userRouter = require('./routes/userRouter');

const wss = require('./webSocket');
const friendsRouter = require('./routes/friendsRouter');
const chatRouter = require('./routes/chatRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));

const sessionParser = session({
  name: 'sid_socket',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

app.use(cookieParser());
app.use(sessionParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/friends', friendsRouter);


app.use('/api/chat', chatRouter);

const server = http.createServer(app);

const map = new Map();

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, map);
    });
  });
});

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
