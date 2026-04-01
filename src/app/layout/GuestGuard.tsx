import { useAuthStore } from '@entities/auth'
import { routes } from '@shared/config'
import { Navigate, Outlet } from 'react-router-dom'

const GuestGuard = () => {
	const isAuthorized = useAuthStore(s => s.isAuth)

	if (isAuthorized) return <Navigate to={routes.feed.path} />

	return <Outlet />
}

export default GuestGuard
