import { getFeed, getMyPosts } from '@entities/post'
import { POST_QUERY_KEY } from '@shared/config'
import { getNextPageParam } from '@shared/lib'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const usePosts = (profileId?: Id) => {
	return useSuspenseInfiniteQuery({
		queryKey: profileId ? [POST_QUERY_KEY, profileId] : [POST_QUERY_KEY],
		queryFn: params => (profileId ? getMyPosts(params.pageParam) : getFeed(params.pageParam)),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		staleTime: profileId ? 0 : Infinity,
		gcTime: profileId ? 0 : Infinity
	})
}
