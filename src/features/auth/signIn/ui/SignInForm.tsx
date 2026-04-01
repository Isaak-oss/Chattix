import { useAuthMutation } from '@features/auth/model/useAuthMutation.ts'
import { type SignInFormSchema, signInFormSchema } from '@features/auth/signIn/model/signInFormShema.ts'
import { GoogleAuthButton } from '@features/auth/ui/GoogleAuthButton.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import { routes } from '@shared/config'
import { getDefaultValues, parseApiErrorToMessage, setFormErrors } from '@shared/lib'
import { EmailField, FieldsContainer, PasswordField } from '@shared/ui'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { useSignIn } from '../model/useSignIn.ts'

export const SignInForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid },
		setError
	} = useForm<SignInFormSchema>({
		mode: 'onTouched',
		resolver: zodResolver(signInFormSchema),
		defaultValues: getDefaultValues(signInFormSchema)
	})

	const { mutate: signIn, error, isPending } = useAuthMutation(useSignIn)

	const onSubmit = (data: SignInFormSchema) => {
		signIn(data, {
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
						<PasswordField control={control} />
					</FieldsContainer>

					{/* Forgot link */}
					<Link
						component={NavLink}
						to={routes.authForgotPassword.path}
						underline="none"
						variant="link"
						color="text.secondary"
						sx={{
							color: 'text.secondary',
							transition: 'color 0.2s',
							ml: 'auto',
							'&:hover': {
								color: 'text.primary'
							}
						}}
					>
						Forgot password?
					</Link>

					{/* Submit button */}
					<Button
						type="submit"
						variant="contained"
						endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}
						disabled={!isValid}
						loading={isPending}
					>
						Sign In
					</Button>

					<Link
						component={NavLink}
						to={routes.authSignUp.path}
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
						Sign Up
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
