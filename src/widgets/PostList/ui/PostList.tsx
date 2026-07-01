import { useCurrentUser } from '@entities/user'
import { CreatePostForm } from '@features/post'
import { Box, Divider, Stack } from '@mui/material'
import { useProfileId } from '@shared/lib'
import { InfinityDataList } from '@shared/ui'

import { usePosts } from '../model/usePosts.ts'
import { PostCard } from './PostCard/PostCard.tsx'

export const PostList = ({ canAddPost = true }: { canAddPost?: boolean }) => {
	const currentUser = useCurrentUser()
	const profileId = useProfileId()

	const postsQuery = usePosts(profileId)

	const isMe = profileId ? currentUser.id === profileId : true
	const isPostForm = canAddPost && isMe

	return (
		<Stack sx={{ minWidth: 0 }}>
			{isPostForm && (
				<Box>
					<CreatePostForm />
					<Divider sx={{ my: { xs: 3, sm: 5 } }} />
				</Box>
			)}
			<InfinityDataList
				query={postsQuery}
				renderItem={post => <PostCard post={post} canChangePosts={post.author.id === currentUser.id} />}
				emptyListTitle={'No posts found'}
			/>
		</Stack>
	)
}
