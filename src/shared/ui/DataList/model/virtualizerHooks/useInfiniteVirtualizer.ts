import { useScrollRef } from '@shared/lib'
import { type ReactVirtualizerOptions, useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'

type UseInfiniteVirtualizerProps<TItemElement extends Element> = PartialKeys<
	ReactVirtualizerOptions<HTMLElement, TItemElement>,
	'observeElementRect' | 'observeElementOffset' | 'scrollToFn' | 'getScrollElement'
> & {
	hasNextPage?: boolean
	onLoadMore?: () => void
	isFetching?: boolean
	dataLength: number
	reverse?: boolean
	autoScrollToEnd?: boolean
}

export const useInfiniteVirtualizer = <TItemElement extends Element>({
	hasNextPage = false,
	onLoadMore,
	isFetching = false,
	dataLength,
	reverse = false,
	autoScrollToEnd = false,
	horizontal = false,
	...options
}: UseInfiniteVirtualizerProps<TItemElement>) => {
	const parentRef = useScrollRef()
	const didInitialReverseScrollRef = useRef(false)
	const isLoadingRef = useRef(false)

	const virtualizer = useVirtualizer({
		getScrollElement: () => parentRef.current,
		horizontal,
		anchorTo: reverse ? 'end' : 'start',
		followOnAppend: autoScrollToEnd ? 'auto' : false,
		scrollEndThreshold: 16,
		...options
	})

	const virtualItems = virtualizer.getVirtualItems()
	const totalSize = virtualizer.getTotalSize()

	useEffect(() => {
		if (!hasNextPage || !onLoadMore) return
		if (isFetching || isLoadingRef.current) return
		if (reverse && !didInitialReverseScrollRef.current) return
		if (reverse && virtualizer.isAtEnd()) return

		const boundaryItem = reverse ? virtualItems[0] : virtualItems.at(-1)

		if (!boundaryItem) return

		const reachedBoundary = reverse ? boundaryItem.index <= 0 : boundaryItem.index >= dataLength - 1

		if (!reachedBoundary) return

		isLoadingRef.current = true
		onLoadMore()
	}, [dataLength, hasNextPage, isFetching, onLoadMore, reverse, virtualItems, virtualizer])

	useEffect(() => {
		if (!isFetching) {
			isLoadingRef.current = false
		}
	}, [isFetching])

	useLayoutEffect(() => {
		if (!reverse) return

		if (dataLength === 0) {
			didInitialReverseScrollRef.current = false

			return
		}

		if (didInitialReverseScrollRef.current) return

		const frameId = requestAnimationFrame(() => {
			virtualizer.scrollToEnd()
			didInitialReverseScrollRef.current = true
		})

		return () => cancelAnimationFrame(frameId)
	}, [dataLength, reverse, totalSize, virtualizer])

	const containerStyle = useMemo(
		() =>
			horizontal
				? { width: totalSize, position: 'relative' as const }
				: { height: totalSize, position: 'relative' as const },
		[horizontal, totalSize]
	)

	return {
		...virtualizer,
		containerStyle,
		virtualItems
	}
}
