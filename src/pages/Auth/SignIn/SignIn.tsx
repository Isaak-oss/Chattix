import { SignInForm } from '@features/auth'
import { Typography } from '@mui/material'
import { AuthLayout } from '@widgets/Auth'

export const SignIn = () => {
	return (
		<AuthLayout>
			<Typography variant="h3" mb={1}>
				{'Welcome back'}
			</Typography>
			<Typography mb={4} variant="subtitle1">
				{'Enter your credentials to access your account'}
			</Typography>
			<SignInForm />
		</AuthLayout>
	)
}
