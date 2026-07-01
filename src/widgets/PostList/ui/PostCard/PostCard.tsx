import type { Post } from '@entities/post'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { formatDate } from '@shared/lib'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { UpdatePostForm } from '@widgets/PostList'
import { memo, useState } from 'react'

type PostCardType = {
	post: Post
	canChangePosts: boolean
}

export const PostCard = memo(({ post, canChangePosts }: PostCardType) => {
	const [isEditing, setIsEditing] = useState(false)
	const [postContent, setPostContent] = useState(post.content)

	return (
		<Card
			sx={{
				boxShadow: 'none',
				transition: 'all 0.2s ease',
				'&:hover': {
					borderColor: 'divider'
				}
			}}
		>
			<CardContent sx={{ p: { xs: 2, sm: 3 } }}>
				<Stack flexDirection="row" gap={{ xs: 1.5, sm: 2 }} mb={2} alignItems="flex-start" minWidth={0}>
					<UserAvatar variant="circular" userName={post.author.username} />
					<Box sx={{ flex: 1, minWidth: 0 }}>
						<Stack flexDirection="row" gap={{ xs: 1, sm: 2 }} mb={2} alignItems="center" flexWrap="wrap">
							<Typography variant="subtitle2" noWrap>
								{post.author.fullName}
							</Typography>
							<Typography variant="body2" color="text.secondary" noWrap>
								@{post.author.username}
							</Typography>
							<Box
								sx={{
									width: 3,
									height: 3,
									borderRadius: '50%',
									bgcolor: 'divider'
								}}
							/>
							<Typography variant="caption" color="text.secondary">
								{formatDate(post.createdAt)}
							</Typography>
						</Stack>
					</Box>
					{canChangePosts && (
						<IconButton onClick={() => setIsEditing(!isEditing)} size={'small'}>
							<EditIcon fontSize="small" />
						</IconButton>
					)}
				</Stack>
				{isEditing ? (
					<UpdatePostForm
						postId={post.id}
						postContent={postContent}
						onChange={setPostContent}
						onClose={() => setIsEditing(false)}
					/>
				) : (
					<Box
						sx={{
							maxHeight: 200,
							overflow: 'auto',
							border: '1px solid',
							borderColor: 'secondary.main',
							borderRadius: 1,
							minHeight: 100,
							px: { xs: 1.5, sm: 2 },
							py: 1
						}}
					>
						<Typography variant="body1" whiteSpace={'pre-line'}>
							{postContent}
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	)
})
