import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { InputAdornment, TextField } from '@mui/material'
import { Controller, type FieldValues, type Path } from 'react-hook-form'

import type { BaseFormFieldProps } from '../model/types.ts'

export const EmailField = <T extends FieldValues>({ control, name = 'email' as Path<T> }: BaseFormFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					helperText={!!error && error.message}
					label="Email Address"
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<EmailOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
								</InputAdornment>
							)
						}
					}}
				/>
			)}
		/>
	)
}
