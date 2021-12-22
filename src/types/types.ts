/* eslint-disable @typescript-eslint/no-namespace */
// Signup, Login Form
export interface SignUpType extends LoginType {
  nickname: string;
}

export interface LoginType {
  username: string;
  password: string;
}

// Login Success
export interface LoginSuccess {
  message: string;
  success: boolean;
  token: string;
  user: {
    username: string;
    nickname: string;
  };
}

// Signup Success
export interface SignupSuccess {
  created_at: string;
  insertedDate: string;
  nickname: string;
  password: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}

export interface Position {
  width: number;
  height: number;
  x: number;
  y: number;
  z: number;
  id?: number;
}

export interface PostDataType {
  title: string;
  contents: string;
  position: Position;
  isDraggable: boolean;
}

export interface PostItemType extends PostDataType {
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}
