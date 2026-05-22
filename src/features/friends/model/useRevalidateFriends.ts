import { FRIENDS_COUNT_QUERY_KEY, FRIENDS_QUERY_KEY, SUGGESTED_FRIENDS_QUERY_KEY } from '@shared/config'
import { useQueryClient } from '@tanstack/react-query'

export const useRevalidateFriends = () => {
	const queryClient = useQueryClient()

	const revalidateFriends = () => {
		queryClient.invalidateQueries({ queryKey: [FRIENDS_COUNT_QUERY_KEY] })
		queryClient.invalidateQueries({ queryKey: [FRIENDS_QUERY_KEY] })
		queryClient.invalidateQueries({ queryKey: [SUGGESTED_FRIENDS_QUERY_KEY] })
	}

	return revalidateFriends
}
