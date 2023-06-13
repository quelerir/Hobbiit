import { UserType } from './UserTypes';

export type CommentType = {
  id: number;
  commentbody: string;
  user_id: number;
  post_id: number;
  User?: UserType;
};

export type CommentFormType = {
  commentbody: string;
};
