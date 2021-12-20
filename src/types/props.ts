export interface Props {
  postItems: PostItemType[];
  postItem: PostItemType;
  i: number;
}

export interface PostItemType {
  title: string;
  content: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
