import { SignInForm } from '@features/auth'
import { Typography } from '@mui/material'
import { AuthPageLayout } from '@widgets/Auth'

export const SignIn = () => {
	return (
		<AuthPageLayout>
			<Typography variant="h3" mb={1}>
				{'Welcome back'}
			</Typography>
			<Typography mb={4} variant="subtitle1">
				{'Enter your credentials to access your account'}
			</Typography>
			<SignInForm />
		</AuthPageLayout>
	)
}
