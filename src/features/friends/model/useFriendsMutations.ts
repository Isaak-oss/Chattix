import { FRIENDS_COUNT_QUERY_KEY } from '@shared/config'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useFriendsMutations = <TData = unknown, TVariables = unknown>(
	mutationFn: (variables: TVariables) => Promise<TData>
) => {
	const queryClient = useQueryClient()

	const mutate = useCallback(
		async (variables: TVariables) => {
			try {
				await mutationFn(variables)
				queryClient.invalidateQueries({ queryKey: [FRIENDS_COUNT_QUERY_KEY] })
			} catch (error) {
				// TODO: Handle error
				console.error(error)

				throw error
			}
		},
		[mutationFn, queryClient]
	)

	return { mutate }
}
