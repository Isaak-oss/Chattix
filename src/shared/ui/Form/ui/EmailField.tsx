import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { InputAdornment } from '@mui/material'
import { DefaultField } from '@shared/ui'
import { type FieldValues, type Path } from 'react-hook-form'

import type { BaseFormFieldProps } from '../model/types.ts'

export const EmailField = <T extends FieldValues>({
	control,
	name = 'email' as Path<T>,
	label = 'Email Address'
}: BaseFormFieldProps<T>) => {
	return (
		<DefaultField
			control={control}
			label={label}
			name={name}
			textFieldProps={{
				slotProps: {
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<EmailOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						)
					}
				}
			}}
		/>
	)
}
