import { signUpApi } from '@entities/auth/api/signUpApi.ts'
import { useMutation } from '@tanstack/react-query'

export const useSignUp = () =>
	useMutation({
		mutationFn: signUpApi
	})
