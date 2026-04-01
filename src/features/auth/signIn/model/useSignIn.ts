import { signInApi } from '@entities/auth'
import { useMutation } from '@tanstack/react-query'

export const useSignIn = () =>
	useMutation({
		mutationFn: signInApi
	})
