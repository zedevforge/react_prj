import { BASE_URL } from "../constants";
import type { Post, PostsResponse } from "../types/posts";


export const getPosts = async (): Promise<PostsResponse> => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};


export const getPost = async (
  id: string
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};