import { signUpApi } from '@entities/auth'
import { useMutation } from '@tanstack/react-query'

export const useSignUp = () =>
	useMutation({
		mutationFn: signUpApi
	})
