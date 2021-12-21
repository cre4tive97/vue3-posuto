import { Position } from "./types";

export interface PostItemProps {
  postItem: PostItemType;
  i: number;
}

export interface PostListViewProps {
  postItems: PostItemType[];
}

export interface PostItemType {
  title: string;
  contents: string;
  position: Position;
  __v?: number;
  _id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
}
