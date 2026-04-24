export type ApiMeta = {
	total?: number
	limit?: number
	offset?: number
	hasMore?: boolean
	[key: string]: any
}

export type ApiResponse<T> = {
	data: T
	meta: ApiMeta
}
