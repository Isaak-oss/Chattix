import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

import { addItemToInfiniteQuery } from './addItemToInfiniteQuery.ts'
import { updateItemToInfiniteQuery } from './updateItemToInfiniteQuery.ts'

type AddOrUpdateKey<TData, TKey extends keyof TData> = {
	key: TKey
	customValue?: TData[TKey]
}

export const addOrUpdateItemToInfiniteQuery = <TData, TKey extends keyof TData>(
	item: TData,
	itemKey: AddOrUpdateKey<TData, TKey>,
	old?: InfiniteData<ApiResponse<TData[]>>,
	moveUpdatedItemToTop: boolean = false
): InfiniteData<ApiResponse<TData[]>> | undefined => {
	const { key, customValue } = itemKey
	const valueToCompare = customValue ?? item[key]
	const itemAlreadyExists = old?.pages.some(page => page.data.some(oldItem => oldItem[key] === valueToCompare))

	if (itemAlreadyExists) {
		return updateItemToInfiniteQuery(item, itemKey, old, moveUpdatedItemToTop)
	}

	return addItemToInfiniteQuery(item, old, oldItem => oldItem[key])
}
