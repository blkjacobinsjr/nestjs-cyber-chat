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

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export type PublicUser = Omit<User, 'passwordHash'>;

export interface JwtPayload {
  sub: number;
  email: string;
}
