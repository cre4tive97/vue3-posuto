import { posts } from "@/api/index";
import { AxiosResponse } from "axios";

// 포스트 조회
function getPostData(): Promise<AxiosResponse> {
  return posts.get("/");
}
// 포스트 추가
function addPostData(postData) {
  return posts.post("/", postData);
}
// 포스트 수정
function updatePostData(postId, postData) {
  return posts.put(`/${postId}`, postData);
}
// 포스트 삭제
function deletePostData(postId) {
  return posts.delete(`/${postId}`);
}

export { getPostData, addPostData, updatePostData, deletePostData };
