import { type Session, useAuthStore } from '@entities/auth'
import { USER_QUERY_KEY } from '@shared/config'
import { type UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAuthMutation = <TData extends Session, TError, TVariables>(
	useMutationHook: () => UseMutationResult<TData, TError, TVariables>
) => {
	const setToken = useAuthStore(s => s.setToken)
	const queryClient = useQueryClient()

	const mutation = useMutationHook()

	const wrappedMutate: typeof mutation.mutate = (variables, options) => {
		mutation.mutate(variables, {
			...options,
			onSuccess: async data => {
				setToken(data.access_token)
				await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
			},
			onError: (error, vars, onMutateResult, ctx) => {
				options?.onError?.(error, vars, onMutateResult, ctx)
			}
		})
	}

	return {
		...mutation,
		mutate: wrappedMutate
	}
}
