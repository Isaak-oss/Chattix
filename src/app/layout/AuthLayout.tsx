import { useAuthStore } from '@entities/auth'
import { useUser } from '@entities/user'
import { Box, Stack } from '@mui/material'
import { routes } from '@shared/config'
import { LoaderScreen } from '@shared/ui'
import { NavBar } from '@widgets/NavBar'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
	const token = useAuthStore(s => s.token)
	const isAuthorized = useAuthStore(s => s.isAuth)

	// initiate user session
	const { data, isLoading } = useUser()

	// redirect to authSignIn if no token
	if (!token) return <Navigate to={routes.authSignIn.path} />

	/*
		Waiting until user data is fetching
		User data is an indicator of isAuthorized
		If getMe reject 401 error, then this will cause onUnauthorized function
		See SessionProvider
	*/
	if (isLoading) {
		return <LoaderScreen />
	}

	if (!data && !isAuthorized) return <Navigate to={routes.authSignIn.path} />

	return (
		<Stack flexDirection={{ xs: 'column-reverse', sm: 'row' }} height={'100vh'}>
			<NavBar />
			<Box flex={1}>
				<Outlet />
			</Box>
		</Stack>
	)
}

export default AuthLayout
