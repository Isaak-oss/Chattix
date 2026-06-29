import { Box, Stack } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { EmptyList, Loader } from '@shared/ui'
import { useInfiniteVirtualizer } from '@shared/ui/InfinityDataList/model/virtualizerHooks/useInfiniteVirtualizer.ts'
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { type VirtualItem } from '@tanstack/react-virtual'
import { type ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react'

type ChatListProps<TMessage extends { id: string }> = {
	messagesReactQuery: UseInfiniteQueryResult<InfiniteData<ApiResponse<TMessage[]>>>
	renderItem: (item: TMessage) => ReactNode
}

export const ChatList = <TMessage extends { id: string }>({
	messagesReactQuery,
	renderItem
}: ChatListProps<TMessage>) => {
	const [didInitialScroll, setDidInitialScroll] = useState(false)

	// React Query configuration
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = messagesReactQuery

	const messages = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data?.pages])
	const orderedMessages = useMemo(() => [...messages].reverse(), [messages])

	// Virtualizer configuration
	const { containerStyle, virtualItems, measureElement, scrollToEnd } = useInfiniteVirtualizer({
		dataLength: orderedMessages?.length,
		count: orderedMessages?.length,
		estimateSize: () => 72,
		getItemKey: useCallback((index: number) => orderedMessages[index]!.id, [orderedMessages]),
		anchorTo: 'end',
		followOnAppend: 'smooth',
		scrollEndThreshold: 80,
		overscan: 6,
		gap: 10,

		onLoadMore: fetchNextPage,
		hasNextPage,
		isFetching,
		reverse: true
	})

	// TODO: в будущем можно будет добавить cursor-based pagination и сделать полноценную подгрузку сообщений с последнего прочитанного вверх и вниз
	useLayoutEffect(() => {
		if (didInitialScroll) return
		scrollToEnd({ behavior: 'instant' })
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setDidInitialScroll(true)
	}, [didInitialScroll, scrollToEnd])

	if (isLoading) {
		return <Loader />
	}

	if (!orderedMessages.length) {
		return <EmptyList title={'No messages'} />
	}

	return (
		<Box>
			<Stack sx={containerStyle}>
				{virtualItems.map((virtualRow: VirtualItem) => (
					<Box
						key={virtualRow.key}
						ref={measureElement}
						data-index={virtualRow.index}
						sx={{
							position: 'absolute',
							transform: `translateY(${virtualRow.start}px)`,
							width: '100%'
						}}
					>
						{renderItem(orderedMessages[virtualRow.index])}
					</Box>
				))}
			</Stack>

			{isFetchingNextPage && <Loader />}
		</Box>
	)
}
