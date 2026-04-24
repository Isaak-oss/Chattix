import { Box, Stack } from '@mui/material'
import { useScrollRef } from '@shared/lib/ScrollProvider.tsx'
import { EmptyList, Loader } from '@shared/ui'
import { type VirtualItem, useVirtualizer } from '@tanstack/react-virtual'
import { type ReactNode, useEffect, useRef, useState } from 'react'

type DataListProps<T> = {
	data: T[]
	renderItem: (item: T) => ReactNode
	estimateSize?: (index: number) => number
	overscan?: number
	flexDirection?: 'row' | 'column'

	// infinite scroll
	hasNextPage?: boolean
	isFetchingNextPage?: boolean
	onLoadMore?: () => void
}

export const DataList = <T,>({
	data,
	renderItem,
	estimateSize = () => 84,
	overscan = 8,
	flexDirection = 'column',

	hasNextPage,
	isFetchingNextPage,
	onLoadMore
}: DataListProps<T>) => {
	const parentRef = useScrollRef()
	const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null)
	const isLoadingRef = useRef(false)

	useEffect(() => {
		if (parentRef.current) {
			setScrollElement(parentRef.current)
		}
	}, [parentRef])

	const isHorizontal = flexDirection === 'row'

	const rowVirtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => scrollElement,
		estimateSize,
		overscan,
		horizontal: isHorizontal,
		gap: 20
	})

	const virtualItems = rowVirtualizer.getVirtualItems()

	// infinite scroll
	useEffect(() => {
		if (!hasNextPage || !onLoadMore) return

		const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

		if (!lastItem) return

		const isLastItemVisible = lastItem.index >= data.length - 1

		if (isLastItemVisible && !isFetchingNextPage && !isLoadingRef.current) {
			isLoadingRef.current = true
			onLoadMore()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetchingNextPage, virtualItems])

	useEffect(() => {
		if (!isFetchingNextPage) {
			isLoadingRef.current = false
		}
	}, [isFetchingNextPage])

	const totalSize = rowVirtualizer.getTotalSize()
	const containerStyle = isHorizontal
		? { width: totalSize, position: 'relative' as const }
		: { height: totalSize, position: 'relative' as const }

	if (!data.length) {
		return <EmptyList />
	}

	return (
		<Box>
			<Stack sx={containerStyle}>
				{virtualItems.map((virtualRow: VirtualItem) => (
					<Box
						key={virtualRow.key}
						ref={rowVirtualizer.measureElement}
						data-index={virtualRow.index}
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							...(isHorizontal
								? {
										height: '100%',
										transform: `translateX(${virtualRow.start}px)`
									}
								: {
										width: '100%',
										transform: `translateY(${virtualRow.start}px)`
									})
						}}
					>
						{renderItem(data[virtualRow.index])}
					</Box>
				))}
			</Stack>

			{isFetchingNextPage && <Loader />}
		</Box>
	)
}
