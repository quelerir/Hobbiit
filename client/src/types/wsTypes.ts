import { type } from 'os';

export const SOCKET_INIT = 'SOCKET_INIT';
export type WsInitType = {
  type: typeof SOCKET_INIT;
};

export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export type WsConnectType = {
  type: typeof SOCKET_CONNECT;
};

export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export type WsCloseType = {
  type: typeof SOCKET_CLOSE;
};

export const UPDATE_STATUS = 'UPDATE_STATUS';
export type WsUpdateStatusType = {
  type: typeof UPDATE_STATUS;
};

export const SEND_MESSAGE = 'SEND_MESSAGE';
export type WsSendMessageType = {
  type: typeof SEND_MESSAGE;
};

export const SEND_LIKE = 'SEND_LIKE';
export type WsSendLikeType = {
  type: typeof SEND_LIKE;
};

export type WsActionTypes =
  | WsInitType
  | WsConnectType
  | WsUpdateStatusType
  | WsCloseType
  | WsSendMessageType
  | WsSendLikeType;
