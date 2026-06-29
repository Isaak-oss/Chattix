import type { VirtualItem } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'

type ScrollRect = {
	width: number
	height: number
}

type UseVirtualScrollItemProps<T> = {
	data: T[]
	getItemKey?: (item: T, index: number) => unknown
	isHorizontal: boolean
	isReverse: boolean
	onScroll?: (item: T, index: number) => void
	scrollOffset?: number | null
	scrollRect?: ScrollRect | null
	virtualItems: VirtualItem[]
}

export const useVirtualScrollItem = <T>({
	data,
	getItemKey,
	isHorizontal,
	isReverse,
	onScroll,
	scrollOffset,
	scrollRect,
	virtualItems
}: UseVirtualScrollItemProps<T>) => {
	const currentScrollItemKeyRef = useRef<unknown>(null)

	useEffect(() => {
		if (!onScroll) return
		if (!scrollRect) return

		const currentScrollOffset = scrollOffset ?? 0
		const viewportSize = isHorizontal ? scrollRect.width : scrollRect.height
		const currentScrollEnd = currentScrollOffset + viewportSize
		const visibleItems = virtualItems.filter(
			virtualItem => virtualItem.end > currentScrollOffset && virtualItem.start < currentScrollEnd
		)
		const currentVirtualItem = isReverse ? visibleItems.at(-1) : visibleItems[0]

		if (!currentVirtualItem) return

		const dataIndex = currentVirtualItem.index
		const currentItem = data[dataIndex]
		const currentItemKey = getItemKey?.(currentItem, dataIndex) ?? currentItem

		if (currentScrollItemKeyRef.current === currentItemKey) return

		currentScrollItemKeyRef.current = currentItemKey
		onScroll(currentItem, dataIndex)
	}, [data, getItemKey, isHorizontal, isReverse, onScroll, scrollOffset, scrollRect, virtualItems])
}
