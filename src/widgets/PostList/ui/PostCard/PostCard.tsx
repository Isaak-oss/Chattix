import type { Post } from '@entities/post'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { UpdatePostCardForm } from '@widgets/PostList/ui/PostCard/UpdatePostCardForm.tsx'
import { useState } from 'react'

export const PostCard = ({ post }: { post: Post }) => {
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
			<CardContent sx={{ p: 3 }}>
				<Stack flexDirection="row" gap={2} mb={2} alignItems="flex-start">
					<Avatar
						sx={{
							bgcolor: 'primary.main'
						}}
					>
						{post.author.name.charAt(0)}
					</Avatar>
					<Box sx={{ flex: 1, minWidth: 0 }}>
						<Stack flexDirection="row" gap={2} mb={2} alignItems="flex-start" flexWrap="wrap">
							<Typography variant="subtitle2">{post.author.name}</Typography>
							<Typography variant="body2" color="text.secondary">
								@{post.author.name}
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
								{post.createdAt}
							</Typography>
						</Stack>
					</Box>
					<IconButton onClick={() => setIsEditing(!isEditing)} size={'small'}>
						<EditIcon fontSize="small" />
					</IconButton>
				</Stack>
				{isEditing ? (
					<UpdatePostCardForm
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
							border: '1px solid #000',
							borderColor: 'secondary.main',
							borderRadius: 1,
							minHeight: 100,
							px: 2,
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
}
