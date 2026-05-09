import type { AxiosError } from 'axios'
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { parseApiErrorToForm } from './parseApiError.ts'
import { valueIsObject } from './valueIsObject.ts'

export const setFormErrors = <T extends FieldValues>(setError: UseFormSetError<T>, errors: AxiosError) => {
	const parsedError = parseApiErrorToForm(errors)

	if (!valueIsObject(parsedError)) return

	Object.keys(parsedError).forEach(fieldName => {
		setError(fieldName as Path<T>, {
			type: 'server',
			message: parsedError[fieldName]
		})
	})
}
