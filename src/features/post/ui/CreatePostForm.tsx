import { type Post, createPost } from '@entities/post'
import { useMe } from '@entities/user'
import { Box, Button, Card, CardContent, Divider, Stack, TextField } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { POST_QUERY_KEY } from '@shared/config'
import { addItemToInfiniteQuery } from '@shared/lib'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const CreatePostForm = () => {
	const queryClient = useQueryClient()
	const [text, setText] = useState('')

	const { data: user } = useMe()
	const { mutate, isPending } = useMutation({
		mutationFn: createPost,
		onSuccess: newPost => {
			setText('')
			queryClient.setQueriesData<InfiniteData<ApiResponse<Post[]>>>({ queryKey: [POST_QUERY_KEY] }, old =>
				addItemToInfiniteQuery(newPost.data, old, post => post.id)
			)
		}
	})

	const onSubmit = async () => {
		mutate({ content: text })
	}

	return (
		<Card>
			<CardContent sx={{ p: { xs: 2, sm: 3 } }}>
				<Stack gap={2} flexDirection="row">
					<UserAvatar variant="circular" userName={user?.data?.username} />
					<TextField
						fullWidth
						multiline
						minRows={2}
						maxRows={6}
						placeholder="Share your thoughts..."
						value={text}
						onChange={e => setText(e.target.value)}
						variant="filled"
					/>
				</Stack>
				<Divider sx={{ borderColor: 'divider', my: 2 }} />
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<Button
						variant="contained"
						size="small"
						disabled={!text.trim() || isPending}
						onClick={onSubmit}
						loading={isPending}
						sx={{
							ml: 'auto',
							py: '5px'
						}}
					>
						Post
					</Button>
				</Box>
			</CardContent>
		</Card>
	)
}
