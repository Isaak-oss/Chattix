import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const updateItemToInfiniteQuery = <TData, TKey extends keyof TData>(
	updatedItem: Partial<TData>,
	updatedKey: { key: TKey; customValue?: TData[TKey]; cleanUpdate?: boolean },
	old?: InfiniteData<ApiResponse<TData[]>>,
	moveUpdatedItemToTop = false
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	if (!old) return old

	const { key, customValue, cleanUpdate = false } = updatedKey

	const valueToCompare = customValue ?? updatedItem[key]

	if (valueToCompare === undefined) return old

	const mergeItem = (item: TData): TData => {
		return cleanUpdate ? (updatedItem as TData) : { ...item, ...updatedItem }
	}

	if (!moveUpdatedItemToTop) {
		return {
			...old,
			pages: old.pages.map(page => ({
				...page,
				data: page.data.map(item => (item[key] === valueToCompare ? mergeItem(item) : item))
			}))
		}
	}

	let updatedFullItem: TData | undefined

	const allItems = old.pages.flatMap(page =>
		page.data
			.map(item => {
				if (item[key] !== valueToCompare) return item

				updatedFullItem = mergeItem(item)
				return null
			})
			.filter((item): item is TData => item !== null)
	)

	if (!updatedFullItem) return old

	const pageSizes = old.pages.map(page => page.data.length)
	const nextItems = [updatedFullItem, ...allItems]

	let cursor = 0

	return {
		...old,
		pages: old.pages.map((page, index) => {
			const size = pageSizes[index]
			const data = nextItems.slice(cursor, cursor + size)
			cursor += size

			return {
				...page,
				data
			}
		})
	}
}
