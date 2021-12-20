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
}
