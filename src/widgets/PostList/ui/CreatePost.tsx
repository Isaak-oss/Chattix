import { type Post, createPost } from '@entities/post'
import { useUser } from '@entities/user'
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, TextField } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { POST_QUERY_KEY } from '@shared/config'
import { addItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const CreatePost = () => {
	const queryClient = useQueryClient()
	const [text, setText] = useState('')

	const { data: user } = useUser()
	const { mutate, isPending } = useMutation({
		mutationFn: createPost,
		onSuccess: newPost => {
			setText('')
			queryClient.setQueriesData<InfiniteData<ApiResponse<Post[]>>>({ queryKey: [POST_QUERY_KEY] }, old =>
				addItemToInfiniteQuery(newPost.data, old)
			)
		}
	})

	const onSubmit = async () => {
		mutate({ content: text })
	}

	return (
		<Card>
			<CardContent sx={{ p: 3 }}>
				<Stack gap={2} flexDirection="row">
					<Avatar
						sx={{
							bgcolor: '#1a1a1a'
						}}
					>
						{user!.data.name.charAt(0)}
					</Avatar>
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
				<Divider sx={{ borderColor: 'rgba(26,26,26,0.06)', my: 2 }} />
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
