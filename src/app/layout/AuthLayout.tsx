import { SocketProvider } from '@app/provider/SocketProvider.tsx'
import { useAuthStore } from '@entities/auth'
import { useMe } from '@entities/user'
import { Box, Stack } from '@mui/material'
import { routes } from '@shared/config'
import { LoaderScreen } from '@shared/ui'
import { NavBar } from '@widgets/NavBar'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
	const token = useAuthStore(s => s.token)
	const isAuthorized = !!token

	// initiate user session
	const { data, isLoading } = useMe()

	// redirect to authSignIn if no token
	if (!token) return <Navigate to={routes.authSignIn.path} />

	/*
		Waiting until user data is fetching
		User data is an indicator of isAuthorized
		If getMe reject 401 error, then this will cause onUnauthorized function
		See session.ts
	*/
	if (isLoading) {
		return <LoaderScreen />
	}

	if (!data && !isAuthorized) return <Navigate to={routes.authSignIn.path} />

	return (
		<SocketProvider>
			<Stack
				flexDirection={{ xs: 'column-reverse', sm: 'row' }}
				sx={{ height: '100dvh', minWidth: 0, overflow: 'hidden' }}
			>
				<NavBar />
				<Box flex={1} minWidth={0} minHeight={0} overflow="hidden">
					<Outlet />
				</Box>
			</Stack>
		</SocketProvider>
	)
}

export default AuthLayout
