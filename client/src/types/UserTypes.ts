export type UserType = {
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  location?: string;
  about?: string;
  avatar?: string;
  status?: boolean;
};

export type UserSignUpType = {
  password?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  location?: string;
  about?: string;
  avatar?: string;
};

export type UserEditType = {
  firstname?: string;
  lastname?: string;
  location?: string;
  about?: string;
};

export type UserHandlersType = {
  e: React.FormEvent<HTMLFormElement>;
  input: UserSignUpType;
};

export type UserSubscribedType = {
  id?: number;
  avatar?: string;
};