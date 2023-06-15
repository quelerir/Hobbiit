const { WebSocketServer } = require('ws');
const { Messages, User, Like, Post, Comment } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;
  wsMap.set(id, { ws, user: request.session.user });
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
      case 'SEND_LIKE': {
        const { postId } = payload;
        const existingLike = await Like.findOne({ where: { post_id: postId, user_id: id } });
        if (existingLike) {
          const onePost = await Post.findByPk(postId);
          onePost.likecount -= 1;
          await onePost.save();
          existingLike.destroy();
        }
        if (!existingLike) {
          await Like.create({ post_id: postId, user_id: id, islike: true });
          const onePost = await Post.findByPk(postId);
          onePost.likecount += 1;
          await onePost.save();
        }
        const savePost = await Post.findByPk(postId);

        const payloadToSend = {
          type: 'post/editPost',
          payload: savePost,
        };

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify(payloadToSend));
        }
        break;
      }
      case 'SEND_POST': {
        const onePost = await Post.findAll({ where: { tread_id: payload }, include: [Like] });
        const sort = onePost.sort((a, b) => b.createdAt - a.createdAt);
        const payloadTo = {
          type: 'post/setPosts',
          payload: sort,
        };

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify(payloadTo));
        }
        break;
      }
      case 'SEND_COMMENT': {
        const { postId } = payload;
        const { commentbody } = payload.input;
        const comment = await Comment.create({ post_id: postId, user_id: id, commentbody });
        const newComment = await Comment.findOne({
          where: { id: comment.id },
          include: { model: User },
        });
        const payloadTo = {
          type: 'comment/addComment',
          payload: newComment,
        };

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify(payloadTo));
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
