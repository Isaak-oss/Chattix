import { parseApiErrorToForm } from '@shared/lib'
import { valueIsObject } from '@shared/lib/valueIsObject.ts'
import type { AxiosError } from 'axios'
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'

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
