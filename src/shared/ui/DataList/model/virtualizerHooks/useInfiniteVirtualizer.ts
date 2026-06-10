import { useScrollRef } from '@shared/lib'
import { type ReactVirtualizerOptions, useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

type UseInfinityScrollProps<TItemElement extends Element> = PartialKeys<
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
	hasNextPage,
	onLoadMore,
	isFetching,
	dataLength,
	reverse,
	autoScrollToEnd,
	horizontal,
	...rest
}: UseInfinityScrollProps<TItemElement>) => {
	// get parentRef from ScrollProvider to use in getScrollElement
	const parentRef = useScrollRef()

	const rowVirtualizer = useVirtualizer({
		getScrollElement: () => parentRef.current,
		horizontal,
		...rest
	})

	// infinity scroll to load more on scroll
	const isLoadingRef = useRef(false)
	const initialReverseScrollDoneRef = useRef(false)
	const pendingScrollToEndRef = useRef(false)
	const pendingScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const virtualItems = rowVirtualizer.getVirtualItems()
	const totalSize = rowVirtualizer.getTotalSize()
	const scrollToEnd = useCallback(() => {
		if (!dataLength) return

		const lastIndex = dataLength - 1

		rowVirtualizer.scrollToIndex(lastIndex, { align: 'end' })

		requestAnimationFrame(() => {
			rowVirtualizer.scrollToIndex(lastIndex, { align: 'end' })

			const scrollElement = parentRef.current

			if (!scrollElement) return

			if (horizontal) {
				scrollElement.scrollLeft = scrollElement.scrollWidth

				return
			}

			scrollElement.scrollTop = scrollElement.scrollHeight
		})
	}, [dataLength, horizontal, parentRef, rowVirtualizer])

	const scheduleScrollToEnd = useCallback(() => {
		pendingScrollToEndRef.current = true
		scrollToEnd()

		if (pendingScrollTimeoutRef.current) {
			clearTimeout(pendingScrollTimeoutRef.current)
		}

		pendingScrollTimeoutRef.current = setTimeout(() => {
			scrollToEnd()
			pendingScrollToEndRef.current = false
			pendingScrollTimeoutRef.current = null
		}, 120)
	}, [scrollToEnd])

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

	useLayoutEffect(() => {
		if (!reverse) return

		if (dataLength === 0) {
			initialReverseScrollDoneRef.current = false

			return
		}

		if (!initialReverseScrollDoneRef.current) {
			scheduleScrollToEnd()
			initialReverseScrollDoneRef.current = true
		}
	}, [dataLength, reverse, scheduleScrollToEnd])

	const prevDataLengthRef = useRef(dataLength)

	useLayoutEffect(() => {
		const prevDataLength = prevDataLengthRef.current
		prevDataLengthRef.current = dataLength

		if (!autoScrollToEnd || prevDataLength === 0 || dataLength <= prevDataLength) return

		scheduleScrollToEnd()
	}, [autoScrollToEnd, dataLength, scheduleScrollToEnd])

	useLayoutEffect(() => {
		if (!pendingScrollToEndRef.current) return

		scrollToEnd()
	}, [scrollToEnd, totalSize])

	useEffect(() => {
		return () => {
			if (pendingScrollTimeoutRef.current) {
				clearTimeout(pendingScrollTimeoutRef.current)
			}
		}
	}, [])

	const containerStyle = horizontal
		? { width: totalSize, position: 'relative' as const }
		: { height: totalSize, position: 'relative' as const }

	return { virtualItems, containerStyle, ...rowVirtualizer }
}
