export interface CommentModel {
  id: string;
  author: {
    id: string;
    name: string;
    userName: string;
    avatar: string;
  };
  content: string;
  response: string;
  createdOn: string;
  respondedOn: string;
}
