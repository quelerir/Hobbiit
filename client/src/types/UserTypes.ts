export type UserType = {
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  location?: string;
  about?: string;
  avatar?: string;
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

export type UserHandlersType = {
  e: React.FormEvent<HTMLFormElement>;
  input: UserSignUpType;
};
