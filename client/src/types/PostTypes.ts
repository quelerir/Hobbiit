export type PostType = {
  id: number;
  posttitle: string;
  postbody: string;
  postimg?: string;
  likecount: number;
  user_id: number;
  tread_id: number;
};

export type PostFormType = {
  posttitle: string;
  postbody: string;
  postimg?: string;
};
