import { useScrollRef } from '@shared/lib'
import { type ReactVirtualizerOptions, useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'

type UseInfinityScrollProps<TItemElement extends Element> = PartialKeys<
	ReactVirtualizerOptions<HTMLElement, TItemElement>,
	'observeElementRect' | 'observeElementOffset' | 'scrollToFn' | 'getScrollElement'
> & {
	hasNextPage?: boolean
	onLoadMore?: () => void
	isFetching?: boolean
	dataLength: number
}

export const useInfiniteVirtualizer = <TItemElement extends Element>({
	hasNextPage,
	onLoadMore,
	isFetching,
	dataLength,
	...rest
}: UseInfinityScrollProps<TItemElement>) => {
	// get parentRef from ScrollProvider to use in getScrollElement
	const parentRef = useScrollRef()

	const rowVirtualizer = useVirtualizer({
		getScrollElement: () => parentRef.current,
		...rest
	})

	// infinity scroll to load more on scroll
	const isLoadingRef = useRef(false)

	useEffect(() => {
		if (!hasNextPage || !onLoadMore) return

		const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

		if (!lastItem) return

		const isLastItemVisible = lastItem.index >= dataLength - 1

		if (isLastItemVisible && !isFetching && !isLoadingRef.current) {
			isLoadingRef.current = true
			onLoadMore()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetching])

	useEffect(() => {
		if (!isFetching) {
			isLoadingRef.current = false
		}
	}, [isFetching])

	// Necessary data
	const virtualItems = rowVirtualizer.getVirtualItems()
	const totalSize = rowVirtualizer.getTotalSize()

	const containerStyle = rest.horizontal
		? { width: totalSize, position: 'relative' as const }
		: { height: totalSize, position: 'relative' as const }

	return { virtualItems, containerStyle, ...rowVirtualizer }
}
