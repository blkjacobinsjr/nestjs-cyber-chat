export interface Thread {
  id: number;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
}

export interface Comment {
  id: number;
  threadId: number;
  author: string;
  body: string;
  createdAt: Date;
}
