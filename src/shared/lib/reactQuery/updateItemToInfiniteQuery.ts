import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const updateItemToInfiniteQuery = <TData, TKey extends keyof TData>(
	updatedItem: TData,
	updatedKey: { key: TKey; customValue?: TData[TKey]; cleanUpdate?: boolean },
	old?: InfiniteData<ApiResponse<TData[]>>,
	moveUpdatedItemToTop = false
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	if (!old) return old

	const { key, customValue, cleanUpdate = true } = updatedKey
	const valueToCompare = customValue ?? updatedItem[key]

	if (!moveUpdatedItemToTop) {
		return {
			...old,
			pages: old.pages.map(page => ({
				...page,
				data: page.data.map(item =>
					item[key] === valueToCompare ? (cleanUpdate ? updatedItem : { ...item, ...updatedItem }) : item
				)
			}))
		}
	}

	const pageSizes = old.pages.map(page => page.data.length)

	const allItems = old.pages.flatMap(page => page.data).filter(item => item[key] !== valueToCompare)

	const itemExists = old.pages.some(page => page.data.some(item => item[key] === valueToCompare))

	if (!itemExists) return old

	const nextItems = [updatedItem, ...allItems]

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
