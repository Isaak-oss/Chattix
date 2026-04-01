import { SignUpForm } from '@features/auth'
import { Typography } from '@mui/material'
import { AuthLayout } from '@widgets/Auth'

export const SignUp = () => {
	return (
		<AuthLayout>
			<Typography variant="h3" mb={1}>
				Create account
			</Typography>
			<Typography mb={4} variant="subtitle1">
				Start your journey with us today
			</Typography>
			<SignUpForm />
		</AuthLayout>
	)
}
