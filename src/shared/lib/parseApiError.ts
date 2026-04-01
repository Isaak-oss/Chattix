import type { AxiosError } from 'axios'

export const parseApiError = (error?: AxiosError<any, any> | null) => {
	if (!error) {
		return null
	}

	return {
		axiosMessage: error.message,
		apiErrorMessage: error?.response?.data?.message,
		error: error?.response?.data?.error ?? null
	}
}

export const parseApiErrorToForm = (error?: AxiosError<any, any> | null) => {
	const parsedError = parseApiError(error)

	return parsedError?.error
}

export const parseApiErrorToMessage = (error?: AxiosError<any, any> | null) => {
	const parsedError = parseApiError(error)

	if (parsedError?.apiErrorMessage) {
		return parsedError?.apiErrorMessage
	}

	return parsedError?.axiosMessage
}
