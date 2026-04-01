import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { InputAdornment } from '@mui/material'
import { DefaultField } from '@shared/ui'
import { type FieldValues, type Path } from 'react-hook-form'

import type { BaseFormFieldProps } from '../model/types.ts'

export const NameField = <T extends FieldValues>({
	control,
	name = 'name' as Path<T>,
	label = 'Name'
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
								<PersonOutlineOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						)
					}
				}
			}}
		/>
	)
}
