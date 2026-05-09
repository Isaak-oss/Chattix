import { useAuthStore } from '@entities/auth'
import { getMe } from '@entities/user'
import { USER_QUERY_KEY } from '@shared/config'
import { useQuery } from '@tanstack/react-query'

export const useMe = () => {
	const token = useAuthStore(s => s.token)

	return useQuery({ queryKey: [USER_QUERY_KEY], queryFn: getMe, enabled: !!token, staleTime: Infinity })
}
