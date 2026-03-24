import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
import { InputAdornment, TextField } from '@mui/material'
import { PasswordVisibilityButton } from '@shared/ui'
import { useState } from 'react'
import { Controller, type FieldValues, type Path } from 'react-hook-form'

import type { BaseFormFieldProps } from '../model/types.ts'

export const PasswordField = <T extends FieldValues>({
	control,
	name = 'password' as Path<T>
}: BaseFormFieldProps<T>) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false)

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					helperText={!!error && error.message}
					label="Password"
					type="password"
					slotProps={{
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
					}}
				/>
			)}
		/>
	)
}
