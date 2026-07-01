import { useAuthStore } from '@entities/auth'
import type { User } from '@entities/user'
import { USER_QUERY_KEY } from '@shared/config'
import { useQueryClient } from '@tanstack/react-query'

export const useCurrentUser = () => {
	const user = useAuthStore(s => s.user)
	const queryClient = useQueryClient()
	const cachedUser = queryClient.getQueryData<User>([USER_QUERY_KEY])
	const currentUser = user ?? cachedUser

	if (!currentUser) {
		throw new Error('useCurrentUser must be used after session initialization')
	}

	return currentUser
}
