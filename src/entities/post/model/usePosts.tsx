import { getFeed, getMyPosts } from '@entities/post'
import { MY_POST_QUERY_KEY, POST_QUERY_KEY } from '@shared/config'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const usePosts = (isMy: boolean) => {
	return useSuspenseInfiniteQuery({
		queryKey: isMy ? [MY_POST_QUERY_KEY] : [POST_QUERY_KEY],
		queryFn: params => (isMy ? getMyPosts(params.pageParam) : getFeed(params.pageParam)),
		initialPageParam: 0,
		getNextPageParam: lastPage => {
			const meta = lastPage.meta
			if (!meta.limit || meta.hasMore === false || meta.offset === undefined) return undefined

			return meta.offset + meta.limit
		}
	})
}
