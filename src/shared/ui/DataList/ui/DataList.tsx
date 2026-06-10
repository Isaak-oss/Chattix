import { Box, Collapse, Stack } from '@mui/material'
import { EmptyList, Loader } from '@shared/ui'
import { DataListModes } from '@shared/ui/DataList/model/types.ts'
import { useGridLanes } from '@shared/ui/DataList/model/virtualizerHooks/useGridLanes.ts'
import { useInfiniteVirtualizer } from '@shared/ui/DataList/model/virtualizerHooks/useInfiniteVirtualizer.ts'
import { type VirtualItem } from '@tanstack/react-virtual'
import { type Key, type ReactNode } from 'react'

type DataListProps<T> = {
	isDataLoading?: boolean
	data: T[]
	renderItem: (item: T, index: number) => ReactNode
	estimateSize?: (index: number) => number
	getItemKey?: (item: T, index: number) => Key
	overscan?: number
	mode?: DataListModes
	emptyListTitle?: string
	gap?: number
	minItemWidth?: number
	isFetching: boolean
	hasNextPage?: boolean
	isRefetching?: boolean
	isFetchingNextPage?: boolean
	onLoadMore?: () => void
	reverse?: boolean
	autoScrollToEnd?: boolean
}

export const DataList = <T,>({
	data,
	renderItem,
	estimateSize = () => 84,
	getItemKey,
	overscan = 20,
	mode = DataListModes.VERTICAL,
	emptyListTitle,
	gap = 20,
	minItemWidth = 300,
	isDataLoading,
	isFetching,
	hasNextPage,
	isRefetching,
	isFetchingNextPage,
	onLoadMore,
	reverse = false,
	autoScrollToEnd = false
}: DataListProps<T>) => {
	const dataLength = data.length
	const hasData = !!dataLength
	const isGrid = mode === DataListModes.GRID
	const isHorizontal = mode === DataListModes.HORIZONTAL
	const isReverse = reverse && !isHorizontal

	const { itemWidthInPercent, lanes, containerRef } = useGridLanes({ hasData, isGrid, minItemWidth })

	const getDataIndex = (index: number) => (isReverse ? dataLength - 1 - index : index)

	const { containerStyle, virtualItems, measureElement } = useInfiniteVirtualizer({
		// virtualizer
		count: dataLength,
		estimateSize,
		getItemKey: index => {
			const dataIndex = getDataIndex(index)

			return getItemKey?.(data[dataIndex], dataIndex) ?? index
		},
		overscan,
		horizontal: isHorizontal,
		gap,
		lanes,

		// infinity scroll
		hasNextPage,
		onLoadMore,
		dataLength,
		isFetching,
		reverse: isReverse,
		autoScrollToEnd
	})

	// TODO: add the ReactNode props for full customize
	if (isDataLoading) {
		return <Loader />
	}

	if (!dataLength) {
		return <EmptyList title={emptyListTitle} />
	}

	return (
		<Box ref={containerRef}>
			<Collapse in={isRefetching} timeout="auto">
				<Loader />
			</Collapse>
			{isReverse && isFetchingNextPage && <Loader />}
			<Stack sx={containerStyle}>
				{virtualItems.map((virtualRow: VirtualItem, index: number) => (
					<Box
						key={virtualRow.key}
						ref={measureElement}
						data-index={virtualRow.index}
						sx={{
							position: 'absolute',
							top: 0,
							left: isGrid ? `calc(${(virtualRow.index % lanes) * itemWidthInPercent}%)` : 0,
							...(isHorizontal
								? {
										height: '100%',
										transform: `translateX(${virtualRow.start}px)`
									}
								: {
										minWidth: isGrid ? minItemWidth : '100%',
										transform: `translateY(${virtualRow.start}px)`
									})
						}}
					>
						{renderItem(data[getDataIndex(virtualRow.index)], index)}
					</Box>
				))}
			</Stack>

			{!isReverse && isFetchingNextPage && <Loader />}
		</Box>
	)
}
