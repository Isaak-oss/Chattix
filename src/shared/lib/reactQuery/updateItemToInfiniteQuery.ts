import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const updateItemToInfiniteQuery = <TData, TKey extends keyof TData>(
	updatedItem: TData,
	updatedKey: { key: TKey; customValue?: TData[TKey] },
	old?: InfiniteData<ApiResponse<TData[]>>
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	if (!old) return old

	const { key, customValue } = updatedKey
	const valueToCompare = customValue ?? updatedItem[key]

	return {
		...old,
		pages: old.pages.map(page => ({
			...page,
			data: page.data.map(item => (item[key] === valueToCompare ? updatedItem : item))
		}))
	}
}
