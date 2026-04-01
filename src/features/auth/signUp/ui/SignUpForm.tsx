import { GoogleAuthButton, useAuthMutation, useSignUp } from '@features/auth'
import { type SignUpFormSchema, signUpFormSchema } from '@features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import { routes } from '@shared/config'
import { getDefaultValues, parseApiErrorToMessage, setFormErrors } from '@shared/lib'
import { EmailField, FieldsContainer, NameField, PasswordField } from '@shared/ui'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

export const SignUpForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid },
		setError
	} = useForm<SignUpFormSchema>({
		mode: 'onTouched',
		resolver: zodResolver(signUpFormSchema),
		defaultValues: getDefaultValues(signUpFormSchema)
	})

	const { mutate: signUp, error, isPending } = useAuthMutation(useSignUp)

	const onSubmit = (data: SignUpFormSchema) => {
		signUp(data, {
			onError: error => setFormErrors(setError, error)
		})
	}

	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={3}>
					{/* Fields */}
					<FieldsContainer error={parseApiErrorToMessage(error)}>
						<EmailField control={control} />
						<NameField control={control} />
						<PasswordField control={control} />
						<PasswordField control={control} name={'confirmPassword'} label={'Confirm Password'} />
					</FieldsContainer>

					{/* Submit button */}
					<Button
						type="submit"
						variant="contained"
						endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}
						disabled={!isValid}
						loading={isPending}
					>
						Sign Up
					</Button>

					<Link
						component={NavLink}
						to={routes.authSignIn.path}
						underline="none"
						variant="link"
						color="text.secondary"
						sx={{
							color: 'text.secondary',
							transition: 'color 0.2s',
							textAlign: 'center',
							'&:hover': {
								color: 'text.primary'
							}
						}}
					>
						Sign In
					</Link>

					{/* other auth methods */}
					<Divider sx={{ my: 1 }}>
						<Typography
							variant="caption"
							component="div"
							sx={{
								color: 'text.secondary',
								px: 2
							}}
						>
							or continue with
						</Typography>
					</Divider>

					<GoogleAuthButton />
				</Stack>
			</form>
		</Box>
	)
}
