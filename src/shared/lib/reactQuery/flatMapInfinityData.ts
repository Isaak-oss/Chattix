import type { InfiniteData } from '@tanstack/react-query'

export const flatMapInfinityData = <TItem>(data?: InfiniteData<{ data: TItem[] }, unknown>) => {
	return data?.pages.flatMap(page => page.data) || []
}
