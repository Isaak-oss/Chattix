import { Box } from '@mui/material'
import { DataList } from '@shared/ui'
import { DataListModes } from '@shared/ui/DataList/model/types.ts'
import { FriendTabs, FriendTabsEnum } from '@widgets/FriendsList'
import { useFriends } from '@widgets/FriendsList/model/useFriends.ts'
import { FriendCard } from '@widgets/FriendsList/ui/FriendCard.tsx'
import { useEffect, useState } from 'react'

export const FriendsList = () => {
	const [tab, setTab] = useState<FriendTabsEnum>(FriendTabsEnum.FRIENDS)

	const { friends, outgoingFriends, suggestedFriends, incomingFriends, rejectedFriends } = useFriends(tab)

	const map = {
		[FriendTabsEnum.FRIENDS]: friends,
		[FriendTabsEnum.INCOMING]: incomingFriends,
		[FriendTabsEnum.OUTGOING]: outgoingFriends,
		[FriendTabsEnum.REJECTED]: rejectedFriends,
		[FriendTabsEnum.DISCOVER]: suggestedFriends
	} as const

	const query = map[tab] ?? friends

	const dataListProps = {
		data: query.data?.pages.flatMap(p => p.data) || [],
		isDataLoading: query.isLoading,
		hasNextPage: query.hasNextPage,
		onLoadMore: query.fetchNextPage,
		refetch: query.refetch,
		isFetching: query.isFetching,
		isRefetching: query.isRefetching,
		isFetchingNextPage: query.isFetchingNextPage
	}

	useEffect(() => {
		dataListProps.refetch()
	}, [tab])

	return (
		<Box sx={{ minWidth: 0 }}>
			<FriendTabs setTab={setTab} tab={tab} />
			<DataList
				{...dataListProps}
				getItemKey={friend => friend.id}
				renderItem={friend => <FriendCard friend={friend} />}
				mode={DataListModes.GRID}
				emptyListTitle={'The list is empty'}
				minItemWidth={260}
			/>
		</Box>
	)
}
