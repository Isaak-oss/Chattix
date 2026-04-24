import { usePosts } from '@entities/post/model/usePosts.tsx'
import { Divider, Stack } from '@mui/material'
import { DataList } from '@shared/ui'
import { CreatePost } from '@widgets/PostList/ui/CreatePost.tsx'
import { PostCard } from '@widgets/PostList/ui/PostCard/PostCard.tsx'

type PostListProps = {
	isMy?: boolean
}

export const PostList = ({ isMy = false }: PostListProps) => {
	const { data, hasNextPage, fetchNextPage, isFetching } = usePosts(isMy)

	const posts = data.pages.flatMap(page => page.data)

	return (
		<Stack>
			<CreatePost />
			<Divider sx={{ my: 5 }} />
			<DataList
				data={posts}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetching}
				onLoadMore={fetchNextPage}
				renderItem={post => <PostCard post={post} />}
			/>
		</Stack>
	)
}
