import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const updateItemToInfiniteQuery = <TData, TKey extends keyof TData>(
	updatedItem: TData,
	updatedKey: TKey,
	old?: InfiniteData<ApiResponse<TData[]>>
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	if (!old) return old

	return {
		...old,
		pages: old.pages.map(page => {
			return {
				...page,
				data: page.data.map(item => {
					if (item[updatedKey] === updatedItem[updatedKey]) {
						return updatedItem
					}
					return item
				})
			}
		})
	}
}
