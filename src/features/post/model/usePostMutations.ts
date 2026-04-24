import { createPost } from '@entities/post'
import { useMutation } from '@tanstack/react-query'

export const usePostMutation = () => {
	return useMutation({
		mutationFn: createPost
	})
}
