import type { ApiResponse } from '@shared/api'
import type { InfiniteData } from '@tanstack/react-query'

export const removeItemFromInfiniteQuery = <TItem>(
	id: string,
	oldData: InfiniteData<ApiResponse<TItem[]>> | undefined,
	getId: (item: TItem) => string
): InfiniteData<ApiResponse<TItem[]>> | undefined => {
	if (!oldData) return oldData

	return {
		...oldData,
		pages: oldData.pages.map(page => ({
			...page,
			data: page.data.filter(item => getId(item) !== id)
		}))
	}
}
