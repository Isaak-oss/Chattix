import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const addItemToInfiniteQuery = <TData>(
	newItem: TData,
	old?: InfiniteData<ApiResponse<TData[]>>,
	getItemKey?: (item: TData) => unknown
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	if (!old) {
		return {
			pages: [
				{
					data: [newItem]
				} as ApiResponse<TData[]>
			],
			pageParams: []
		}
	}

	const newItemKey = getItemKey?.(newItem)
	const itemAlreadyExists =
		getItemKey &&
		old.pages.some(page => {
			return page.data.some(item => getItemKey(item) === newItemKey)
		})

	if (itemAlreadyExists) return old

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
