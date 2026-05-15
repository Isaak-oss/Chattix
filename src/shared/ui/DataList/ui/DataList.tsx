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
	onLoadMore
}: DataListProps<T>) => {
	const dataLength = data.length
	const hasData = !!dataLength
	const isGrid = mode === DataListModes.GRID
	const isHorizontal = mode === DataListModes.HORIZONTAL

	const { itemWidthInPercent, lanes, containerRef } = useGridLanes({ hasData, isGrid, minItemWidth })

	const { containerStyle, virtualItems, measureElement } = useInfiniteVirtualizer({
		// virtualizer
		count: dataLength,
		estimateSize,
		getItemKey: index => getItemKey?.(data[index], index) ?? index,
		overscan,
		horizontal: isHorizontal,
		gap,
		lanes,

		// infinity scroll
		hasNextPage,
		onLoadMore,
		dataLength,
		isFetching
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
						{renderItem(data[virtualRow.index], index)}
					</Box>
				))}
			</Stack>

			{isFetchingNextPage && <Loader />}
		</Box>
	)
}
