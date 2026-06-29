import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { InputAdornment } from '@mui/material'
import { DefaultTextField } from '@shared/ui'
import { type FieldValues, type Path } from 'react-hook-form'

import type { BaseFormFieldProps } from '../model/types.ts'

export const NameField = <T extends FieldValues>({
	control,
	name = 'fullName' as Path<T>,
	label = 'Full Name'
}: BaseFormFieldProps<T>) => {
	return (
		<DefaultTextField
			control={control}
			label={label}
			name={name}
			textFieldProps={{
				slotProps: {
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<PersonOutlineOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						)
					}
				}
			}}
		/>
	)
}
