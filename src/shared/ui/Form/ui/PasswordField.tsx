import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
import { InputAdornment } from '@mui/material'
import { DefaultField, PasswordVisibilityButton } from '@shared/ui'
import { useState } from 'react'
import { type FieldValues, type Path } from 'react-hook-form'

import type { BaseFormFieldProps } from '../model/types.ts'

export const PasswordField = <T extends FieldValues>({
	control,
	name = 'password' as Path<T>,
	label = 'Password'
}: BaseFormFieldProps<T>) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false)

	return (
		<DefaultField
			name={name}
			label={label}
			control={control}
			textFieldProps={{
				slotProps: {
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<HttpsOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						),
						endAdornment: (
							<PasswordVisibilityButton
								isVisible={isPasswordShown}
								onToggle={() => setIsPasswordShown(prev => !prev)}
							/>
						)
					}
				},
				type: isPasswordShown ? 'text' : 'password'
			}}
		/>
	)
}
