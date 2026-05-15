import { FriendStatusQuery, getFriends, getSuggestedFriends } from '@entities/friends'
import { FRIENDS_QUERY_KEY, SUGGESTED_FRIENDS_QUERY_KEY } from '@shared/config'
import { getNextPageParam } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'
import { FriendTabsEnum } from '@widgets/FriendsList'

export const useFriends = (tab: FriendTabsEnum) => {
	const friends = useInfiniteQuery({
		queryKey: [FRIENDS_QUERY_KEY],
		queryFn: params => getFriends(params.pageParam, FriendStatusQuery.ACCEPTED, params.signal),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: tab === FriendTabsEnum.FRIENDS
	})

	const outgoingFriends = useInfiniteQuery({
		queryKey: [FRIENDS_QUERY_KEY, FriendStatusQuery.OUTGOING],
		queryFn: params => getFriends(params.pageParam, FriendStatusQuery.OUTGOING, params.signal),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: tab === FriendTabsEnum.OUTGOING
	})

	const incomingFriends = useInfiniteQuery({
		queryKey: [FRIENDS_QUERY_KEY, FriendStatusQuery.INCOMING],
		queryFn: params => getFriends(params.pageParam, FriendStatusQuery.INCOMING, params.signal),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: tab === FriendTabsEnum.INCOMING
	})

	const rejectedFriends = useInfiniteQuery({
		queryKey: [FRIENDS_QUERY_KEY, FriendStatusQuery.REJECTED],
		queryFn: params => getFriends(params.pageParam, FriendStatusQuery.REJECTED, params.signal),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: tab === FriendTabsEnum.REJECTED
	})

	const suggestedFriends = useInfiniteQuery({
		queryKey: [SUGGESTED_FRIENDS_QUERY_KEY],
		queryFn: params => getSuggestedFriends(params.pageParam, params.signal),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: tab === FriendTabsEnum.DISCOVER
	})

	return {
		friends,
		incomingFriends,
		outgoingFriends,
		suggestedFriends,
		rejectedFriends
	}
}
