import { FRIENDS_COUNT_QUERY_KEY, FRIENDS_QUERY_KEY, SUGGESTED_FRIENDS_QUERY_KEY } from '@shared/config'
import { queryClient } from '@shared/reactQuery'

export const revalidateFriends = () => {
	queryClient.invalidateQueries({ queryKey: [FRIENDS_COUNT_QUERY_KEY] })
	queryClient.invalidateQueries({ queryKey: [FRIENDS_QUERY_KEY] })
	queryClient.invalidateQueries({ queryKey: [SUGGESTED_FRIENDS_QUERY_KEY] })
}
