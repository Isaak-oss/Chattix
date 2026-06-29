import { Box } from '@mui/material'
import { InfinityDataList } from '@shared/ui'
import { InfinityDataListModes } from '@shared/ui/InfinityDataList/model/types.ts'
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

	useEffect(() => {
		query.refetch()
	}, [tab])

	return (
		<Box sx={{ minWidth: 0 }}>
			<FriendTabs setTab={setTab} tab={tab} />
			<InfinityDataList
				query={query}
				getItemKey={friend => friend.id}
				renderItem={friend => <FriendCard friend={friend} />}
				mode={InfinityDataListModes.GRID}
				emptyListTitle={'The list is empty'}
				minItemWidth={260}
			/>
		</Box>
	)
}
