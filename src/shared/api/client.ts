import { env } from '@shared/lib'
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios'

import type { ApiResponse } from './types.ts'

class ApiClient {
	private instance: AxiosInstance

	constructor() {
		this.instance = axios.create({ baseURL: env.VITE_API_BASE_URL, headers: { 'Content-Type': 'application/json' } })
	}

	attachAuthInterceptors(deps: { getToken: () => string | null; onUnauthorized: () => void }) {
		this.instance.interceptors.request.use(config => {
			const token = deps.getToken()

			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}

			return config
		})

		this.instance.interceptors.response.use(
			response => response,
			error => {
				if (error.response?.status === 401) {
					deps.onUnauthorized()
				}

				return Promise.reject(error)
			}
		)
	}

	private async request<T, D = unknown>(
		method: Method,
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<ApiResponse<T>> {
		const res: AxiosResponse<ApiResponse<T>> = await this.instance.request({
			method,
			url,
			data,
			...config
		})

		return res.data
	}

	get<T>(url: string, config?: AxiosRequestConfig) {
		return this.request<T>('get', url, undefined, config)
	}

	post<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
		return this.request<T, D>('post', url, data, config)
	}

	put<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
		return this.request<T, D>('put', url, data, config)
	}

	patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
		return this.request<T, D>('patch', url, data, config)
	}

	delete<T>(url: string, config?: AxiosRequestConfig) {
		return this.request<T>('delete', url, undefined, config)
	}
}

export const apiClient = new ApiClient()
