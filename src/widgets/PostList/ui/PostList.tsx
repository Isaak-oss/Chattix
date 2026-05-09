import { usePosts } from '@entities/post/model/usePosts.tsx'
import { useMe } from '@entities/user'
import { CreatePostForm } from '@features/post'
import { useProfileId } from '@features/profile'
import { Box, Divider, Stack } from '@mui/material'
import { DataList } from '@shared/ui'
import { PostCard } from '@widgets/PostList/ui/PostCard/PostCard.tsx'

export const PostList = ({ canAddPost = true }: { canAddPost?: boolean }) => {
	const { data: me } = useMe()
	const profileId = useProfileId()

	const { data, hasNextPage, fetchNextPage, isFetching } = usePosts(profileId)

	const posts = data.pages.flatMap(page => page.data)

	const isMe = profileId ? me!.data.id === profileId : true
	const isPostForm = canAddPost && isMe

	return (
		<Stack>
			{isPostForm && (
				<Box>
					<CreatePostForm />
					<Divider sx={{ my: 5 }} />
				</Box>
			)}
			<DataList
				data={posts}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetching}
				onLoadMore={fetchNextPage}
				renderItem={post => <PostCard post={post} canChangePosts={post.author.id === me?.data.id}/>}
				emptyListTitle={'No posts found'}
			/>
		</Stack>
	)
}
