import { getFeed, getMyPosts } from '@entities/post'
import { POST_QUERY_KEY, minute } from '@shared/config'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const usePosts = (profileId?: Id) => {
	return useSuspenseInfiniteQuery({
		queryKey: profileId ? [POST_QUERY_KEY, profileId] : [POST_QUERY_KEY],
		queryFn: params => (profileId ? getMyPosts(params.pageParam) : getFeed(params.pageParam)),
		initialPageParam: 0,
		getNextPageParam: lastPage => {
			const meta = lastPage.meta
			if (!meta.limit || meta.hasMore === false || meta.offset === undefined) return undefined

			return meta.offset + meta.limit
		},
		staleTime: profileId ? 0 : minute * 5,
		gcTime: profileId ? 0 : minute * 5
	})
}
