export type SearchUserType = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  about: string;
  avatar: string;
  status: string;
};

export type SearchTreadType = {
  id: number;
  treadtitle: string;
  treadbody: string;
  treadimg: string;
  user_id: number;
};
