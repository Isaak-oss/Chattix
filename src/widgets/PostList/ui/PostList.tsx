import { useMe } from '@entities/user'
import { CreatePostForm } from '@features/post'
import { Box, Divider, Stack } from '@mui/material'
import { useProfileId } from '@shared/lib'
import { DataList } from '@shared/ui'

import { usePosts } from '../model/usePosts.ts'
import { PostCard } from './PostCard/PostCard.tsx'

export const PostList = ({ canAddPost = true }: { canAddPost?: boolean }) => {
	const { data: me } = useMe()
	const profileId = useProfileId()

	const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, isRefetching } = usePosts(profileId)

	const posts = data.pages.flatMap(page => page.data)

	const isMe = profileId ? me!.data.id === profileId : true
	const isPostForm = canAddPost && isMe

	return (
		<Stack sx={{ minWidth: 0 }}>
			{isPostForm && (
				<Box>
					<CreatePostForm />
					<Divider sx={{ my: { xs: 3, sm: 5 } }} />
				</Box>
			)}
			<DataList
				data={posts}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				isFetching={isFetching}
				isRefetching={isRefetching}
				onLoadMore={fetchNextPage}
				getItemKey={post => post.id}
				renderItem={post => <PostCard post={post} canChangePosts={post.author.id === me?.data.id} />}
				emptyListTitle={'No posts found'}
			/>
		</Stack>
	)
}
