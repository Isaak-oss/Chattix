import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const addItemToInfiniteQuery = <TData>(
	newItem: TData,
	old?: InfiniteData<ApiResponse<TData[]>>
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	if (!old) return old

	return {
		...old,
		pages: old.pages.map((page, index) => {
			if (index === 0) {
				return {
					...page,
					data: [newItem, ...page.data]
				}
			}
			return page
		})
	}
}
