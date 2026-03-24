import { routes } from '@shared/config'
import { Navigate, Outlet } from 'react-router-dom'

const GuestLayout = () => {
	const isAuthorized = false

	if (isAuthorized) return <Navigate to={routes.feed.path} />

	return <Outlet />
}

export default GuestLayout
