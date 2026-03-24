import { type SignInFormSchema, signInFormSchema } from '@features/auth/signIn/model/signInFormShema.ts'
import { GoogleAuthButton } from '@features/auth/ui/GoogleAuthButton.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { routes } from '@shared/config'
import { getDefaultValues } from '@shared/lib'
import { EmailField, FieldsContainer, PasswordField } from '@shared/ui'
import { useForm } from 'react-hook-form'

export const SignInForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<SignInFormSchema>({
		mode: 'onTouched',
		resolver: zodResolver(signInFormSchema),
		defaultValues: getDefaultValues(signInFormSchema)
	})

	const onSubmit = (data: SignInFormSchema) => {
		console.log(data)
	}

	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={3}>
					{/* Fields */}
					<FieldsContainer>
						<EmailField control={control} />
						<PasswordField control={control} />
					</FieldsContainer>

					{/* Forgot link */}
					<Link
						href={routes.authForgotPassword.path}
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
						{'Forgot password?'}
					</Link>

					{/* Submit button */}
					<Button
						type="submit"
						variant="contained"
						endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}
						disabled={!isValid}
						loading={false}
					>
						{'Sign In'}
					</Button>

					{/* other auth methods */}
					<Divider sx={{ my: 2 }}>
						<Typography
							variant="caption"
							component="div"
							sx={{
								color: 'text.secondary',
								px: 2,
								pb: 2
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
