const { WebSocketServer } = require('ws');
const { Messages, User } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;
  wsMap.set(id, { ws, user: request.session.user });

  console.log({ wsMap });

  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'friends/setFriendsOnline',
        payload: Array.from(wsMap.values()).map((el) => el.user),
      }),
    );
  }

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'UPDATE_STATUS': {
        const user = await User.findByPk(id);
        user.status = payload.status;
        await user.save();
        wsMap.set(id, { ws, user });

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'friends/setFriendsOnline',
              payload: Array.from(wsMap.values()).map((el) => el.user),
            }),
          );
        }
        break;
      }
      case 'SEND_MESSAGE': {
        const { recipientId, message } = payload;
        const sender = await User.findByPk(id);
        const recipient = await User.findByPk(recipientId);
        if (!message) {
          return;
        }
        if (sender && recipient) {
          const newMessage = await Messages.create({
            subjectchatuser_id: sender.id,
            objectchatuser_id: recipient.id,
            message,
          });

          // Отправить новое сообщение отправителю
          ws.send(
            JSON.stringify({
              type: 'UserMessage/addMessage',
              payload: newMessage,
            }),
          );

          const recipientConnection = wsMap.get(recipient.id);
          if (recipientConnection) {
            // Отправить новое сообщение получателю
            recipientConnection.ws.send(
              JSON.stringify({
                type: 'UserMessage/addMessage',
                payload: newMessage,
              }),
            );
          }
        }
        break;
      }
      default:
        break;
    }
  });

  ws.on('error', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });

  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });
});

module.exports = wss;
