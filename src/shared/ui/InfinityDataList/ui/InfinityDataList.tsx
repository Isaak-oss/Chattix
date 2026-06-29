import { Box, Collapse, Stack } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { InfinityDataListModes } from '@shared/ui/InfinityDataList/model/types.ts'
import { useGridLanes } from '@shared/ui/InfinityDataList/model/virtualizerHooks/useGridLanes.ts'
import { useInfiniteVirtualizer } from '@shared/ui/InfinityDataList/model/virtualizerHooks/useInfiniteVirtualizer.ts'
import { useVirtualScrollItem } from '@shared/ui/InfinityDataList/model/virtualizerHooks/useVirtualScrollItem.ts'
import { Loader } from '@shared/ui/Loader'
import type { InfiniteData, UseInfiniteQueryResult, UseSuspenseInfiniteQueryResult } from '@tanstack/react-query'
import { type VirtualItem } from '@tanstack/react-virtual'
import type { AxiosError } from 'axios'
import { type Key, type ReactNode, useCallback, useMemo } from 'react'

import { EmptyList } from './EmptyList.tsx'
import {flatMapInfinityData} from "@shared/lib";

type InfinityQueryResult<TItem> =
	| UseInfiniteQueryResult<InfiniteData<ApiResponse<TItem[]>, unknown>, AxiosError>
	| UseSuspenseInfiniteQueryResult<InfiniteData<ApiResponse<TItem[]>, unknown>, AxiosError>

type InfinityDataListProps<TItem> = {
	query: InfinityQueryResult<TItem>
	renderItem: (item: TItem, index: number) => ReactNode
	estimateSize?: (index: number) => number
	getItemKey?: (item: TItem, index: number) => Key
	overscan?: number
	mode?: InfinityDataListModes
	emptyListTitle?: string
	gap?: number
	minItemWidth?: number
	onScroll?: (item: TItem, index: number) => void
	reverse?: boolean
	autoScrollToEnd?: boolean
}

export const InfinityDataList = <TItem,>({
	renderItem,
	estimateSize = () => 84,
	getItemKey,
	overscan = 20,
	mode = InfinityDataListModes.VERTICAL,
	emptyListTitle,
	gap = 20,
	minItemWidth = 300,
	onScroll,
	reverse = false,
	autoScrollToEnd = false,
	query
}: InfinityDataListProps<TItem>) => {
	const { data, isLoading, isFetching, isRefetching, isFetchingNextPage, fetchNextPage, hasNextPage } = query

	const queryItems = useMemo(() => flatMapInfinityData(data), [data])
	const listItems = useMemo(() => (reverse ? [...queryItems].reverse() : queryItems), [reverse, queryItems])

	const dataLength = listItems.length
	const hasData = !!dataLength
	const isGrid = mode === InfinityDataListModes.GRID
	const isHorizontal = mode === InfinityDataListModes.HORIZONTAL
	const isReverse = reverse && !isHorizontal

	const { itemWidthInPercent, lanes, containerRef } = useGridLanes({ hasData, isGrid, minItemWidth })

	const getDataKey = useCallback(
		(index: number) => {
			const item = listItems[index]

			if (getItemKey) return getItemKey(item, index)

			if (item && typeof item === 'object' && 'id' in item) {
				return item.id as Key
			}

			return index
		},
		[getItemKey, listItems]
	)

	const {
		containerStyle,
		virtualItems,
		measureElement,
		scrollOffset,
		scrollRect,
		containerRef: virtualizerContainerRef
	} = useInfiniteVirtualizer({
		// virtualizer
		count: dataLength,
		estimateSize,
		getItemKey: index => {
			return getDataKey(index)
		},
		overscan,
		horizontal: isHorizontal,
		gap,
		lanes,

		// infinity scroll
		hasNextPage,
		onLoadMore: fetchNextPage,
		dataLength,
		isFetching,
		reverse: isReverse,
		autoScrollToEnd
	})

	useVirtualScrollItem({
		data: listItems,
		getItemKey,
		isHorizontal,
		isReverse,
		onScroll,
		scrollOffset,
		scrollRect,
		virtualItems
	})

	// TODO: add the ReactNode props for full customize
	if (isLoading) {
		return <Loader />
	}

	if (!dataLength) {
		return <EmptyList title={emptyListTitle} />
	}

	return (
		<Box ref={containerRef}>
			<Collapse in={isReverse ? isFetchingNextPage : isRefetching} timeout="auto">
				<Loader />
			</Collapse>
			<Stack sx={containerStyle} ref={virtualizerContainerRef}>
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
										maxWidth: '100%',
										minWidth: isGrid ? minItemWidth : '100%',
										transform: `translateY(${virtualRow.start}px)`
									})
						}}
					>
						{renderItem(listItems[virtualRow.index], index)}
					</Box>
				))}
			</Stack>

			{!isReverse && isFetchingNextPage && <Loader />}
		</Box>
	)
}
