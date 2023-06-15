import type { ActionPattern } from 'redux-saga/effects';
import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import type { EventChannel } from 'redux-saga';
import { eventChannel, END } from 'redux-saga';
import {
  SEND_COMMENT,
  SEND_LIKE,
  SEND_MESSAGE,
  SEND_POST,
  SOCKET_CLOSE,
  SOCKET_CONNECT,
  SOCKET_INIT,
  UPDATE_STATUS,
} from '../../types/wsTypes';
import type { WsActionTypes } from '../../types/wsTypes';

function createSocketChannel(socket: WebSocket): EventChannel<WsActionTypes> {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit({ type: SOCKET_CONNECT });
    };

    socket.onerror = function (error) {
      emit({ type: SOCKET_CLOSE });
    };

    socket.onmessage = function (event: MessageEvent<string>) {
      const receivedData = JSON.parse(event.data) as WsActionTypes;
      emit(receivedData);
    };

    socket.onclose = function (event) {
      emit({ type: SOCKET_CLOSE });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function* updateStatus(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(UPDATE_STATUS);
    socket.send(JSON.stringify(message));
  }
}

function* sendMassage(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(SEND_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}

function* sendLike(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(SEND_LIKE);
    socket.send(JSON.stringify(message));
  }
}

function* sendPost(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(SEND_POST);
    socket.send(JSON.stringify(message));
  }
}

function* sendComment(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(SEND_COMMENT);
    socket.send(JSON.stringify(message));
  }
}

function* friendsListWorker(): Generator<unknown, void, WsActionTypes> {
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);
  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(updateStatus, socket);
  yield fork(sendMassage, socket);
  yield fork(sendLike, socket);
  yield fork(sendPost, socket);
  yield fork(sendComment, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel as unknown as ActionPattern<WsActionTypes>);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocketWatcher(): Generator {
  yield takeEvery(SOCKET_INIT, friendsListWorker);
}
