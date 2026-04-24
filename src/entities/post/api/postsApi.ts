import type { Post, PostBody } from '@entities/post'
import { apiClient } from '@shared/api'

const postsLimit = 10

// QUERY
export const getFeed = async (offset: number = 0) => {
	return apiClient.get<Post[]>(`/post/getFeed?offset=${offset}&limit=${postsLimit}`)
}

export const getMyPosts = async (offset: number = 0) => {
	return apiClient.get<Post[]>(`/post/getMyPosts?offset=${offset}&limit=${postsLimit}`)
}

// MUTATION
export const createPost = async (post: PostBody) => {
	return apiClient.post<Post, PostBody>('/post', { content: post.content })
}

export const updatePost = async (postId: Id, post: PostBody) => {
	return apiClient.patch<Post, PostBody>(`/post/${postId}`, { content: post.content })
}
