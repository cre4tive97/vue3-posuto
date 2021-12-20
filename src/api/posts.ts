import { posts } from "@/api/index";
import { PostDataType } from "@/types/types";
import { AxiosResponse } from "axios";

// 포스트 조회
function getPostData(): Promise<AxiosResponse> {
  return posts.get("/");
}
// 포스트 추가
function addPostData(postData: PostDataType): Promise<AxiosResponse> {
  return posts.post("/", postData);
}
// 포스트 수정
function updatePostData(
  postId: string,
  postData: PostDataType
): Promise<AxiosResponse> {
  return posts.put(`/${postId}`, postData);
}
// 포스트 삭제
function deletePostData(postId: string): Promise<AxiosResponse> {
  return posts.delete(`/${postId}`);
}

export { getPostData, addPostData, updatePostData, deletePostData };
