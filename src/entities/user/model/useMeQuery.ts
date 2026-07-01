import { useAuthStore } from '@entities/auth'
import { getMe } from '@entities/user'
import { USER_QUERY_KEY } from '@shared/config'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useMeQuery = () => {
	const token = useAuthStore(s => s.token)
	const syncUser = useAuthStore(s => s.syncUser)

	const query = useQuery({ queryKey: [USER_QUERY_KEY], queryFn: getMe, enabled: !!token, staleTime: Infinity })

	useEffect(() => {
		if (!token) {
			syncUser(null)

			return
		}

		if (query.data) {
			syncUser(query.data)
		}
	}, [query.data, syncUser, token])

	return query
}
