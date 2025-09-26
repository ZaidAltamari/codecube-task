import { Post } from '../types/api';
const BASE_URL =
	process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const fetchWithErrorHandling = async <T>(
	url: string,
	options?: RequestInit,
): Promise<T> => {
	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			...options,
		});
		if (!response.ok) {
			const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
			throw new Error(errorMessage);
		}
		return await response.json();
	} catch (error) {
		console.error('API call failed:', {
			url,
			error: error instanceof Error ? error.message : 'Unknown error',
			options,
		});
		throw error;
	}
};
class ApiService {
	async getPosts(): Promise<Post[]> {
		return fetchWithErrorHandling<Post[]>(`${BASE_URL}/posts`);
	}
	async getPost(id: number): Promise<Post> {
		return fetchWithErrorHandling<Post>(`${BASE_URL}/posts/${id}`);
	}
	async createPost(post: Omit<Post, 'id'>): Promise<Post> {
		return fetchWithErrorHandling<Post>(`${BASE_URL}/posts`, {
			method: 'POST',
			body: JSON.stringify(post),
		});
	}
	async updatePost(
		id: number,
		post: Partial<Omit<Post, 'id'>>,
	): Promise<Post> {
		return fetchWithErrorHandling<Post>(`${BASE_URL}/posts/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ id, ...post }),
		});
	}
	async deletePost(id: number): Promise<void> {
		await fetchWithErrorHandling(`${BASE_URL}/posts/${id}`, {
			method: 'DELETE',
		});
	}
}
export const apiService = new ApiService();
