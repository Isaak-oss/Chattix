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
	reverse?: boolean
}

export const useInfiniteVirtualizer = <TItemElement extends Element>({
	hasNextPage,
	onLoadMore,
	isFetching,
	dataLength,
	reverse,
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
	const initialReverseScrollDoneRef = useRef(false)
	const virtualItems = rowVirtualizer.getVirtualItems()
	const totalSize = rowVirtualizer.getTotalSize()

	useEffect(() => {
		if (!hasNextPage || !onLoadMore) return
		if (reverse && !initialReverseScrollDoneRef.current) return

		const [firstItem] = virtualItems
		const [lastItem] = [...virtualItems].reverse()
		const boundaryItem = reverse ? firstItem : lastItem

		if (!boundaryItem) return

		const isBoundaryItemVisible = reverse ? boundaryItem.index <= 0 : boundaryItem.index >= dataLength - 1

		if (isBoundaryItemVisible && !isFetching && !isLoadingRef.current) {
			isLoadingRef.current = true
			onLoadMore()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataLength, isFetching, reverse, virtualItems])

	useEffect(() => {
		if (!isFetching) {
			isLoadingRef.current = false
		}
	}, [isFetching])

	useEffect(() => {
		if (!reverse) return

		if (dataLength === 0) {
			initialReverseScrollDoneRef.current = false

			return
		}

		if (!initialReverseScrollDoneRef.current) {
			rowVirtualizer.scrollToIndex(0, { align: 'end' })
			initialReverseScrollDoneRef.current = true
		}
	}, [dataLength, reverse, rowVirtualizer])

	const containerStyle = rest.horizontal
		? { width: totalSize, position: 'relative' as const }
		: { height: totalSize, position: 'relative' as const }

	return { virtualItems, containerStyle, ...rowVirtualizer }
}
