import { TextField } from '@mui/material'
import type { DefaultFieldProps } from '@shared/ui/Form/model/types.ts'
import { Controller, type FieldValues, type Path } from 'react-hook-form'

export const DefaultField = <T extends FieldValues>({
	control,
	name = 'password' as Path<T>,
	label = 'Password',
	textFieldProps
}: DefaultFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField {...field} helperText={!!error && error.message} label={label} {...textFieldProps} />
			)}
		/>
	)
}
