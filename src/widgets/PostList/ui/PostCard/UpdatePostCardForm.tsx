import { updatePost } from '@entities/post/api/postsApi.ts'
import { Box, Button, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'

type UpdateFormProps = {
	postContent: string
	postId: string
	onClose: () => void
	onChange: (postContent: string) => void
}

export const UpdatePostCardForm = ({ postContent, onChange, postId, onClose }: UpdateFormProps) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => updatePost(postId, { content: postContent }),
		onSuccess: newPost => {
			onChange(newPost.data.content)
			onClose()
		}
	})

	return (
		<Box>
			<TextField
				fullWidth
				multiline
				minRows={2}
				maxRows={6}
				placeholder="Share your thoughts..."
				value={postContent}
				onChange={e => onChange(e.target.value)}
				variant="filled"
			/>
			<Button
				variant="contained"
				size="small"
				disabled={!postContent.trim() || isPending}
				onClick={() => mutate()}
				loading={isPending}
				sx={{
					ml: 'auto',
					py: '5px',
					mt: 2
				}}
			>
				Update
			</Button>
		</Box>
	)
}
