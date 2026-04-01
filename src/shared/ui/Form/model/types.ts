import type { TextFieldProps } from '@mui/material/TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'

export type DefaultFieldProps<T extends FieldValues> = {
	control: Control<T>
	name?: Path<T>
	label?: string
	textFieldProps?: TextFieldProps
}

export type BaseFormFieldProps<T extends FieldValues> = Omit<DefaultFieldProps<T>, 'textFieldProps'>
