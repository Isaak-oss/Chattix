import AuthLayout from '@app/layout/AuthLayout.tsx'
import GuestLayout from '@app/layout/GuestLayout.tsx'
import { SignIn, SignUp } from '@pages/Auth'
import { Feed } from '@pages/Feed'
import { Friends } from '@pages/Friends'
import { Messages } from '@pages/Messages'
import { NotFound } from '@pages/NotFound'
import { Profile } from '@pages/Profile'
import { Settings } from '@pages/Settings'
import { routes } from '@shared/config'
import { Navigate, Route, Routes } from 'react-router-dom'

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={routes.authSignIn.path} />} />

			<Route element={<GuestLayout />}>
				<Route path={routes.authSignIn.path} element={<SignIn />} />
				<Route path={routes.authSignUp.path} element={<SignUp />} />
			</Route>

			<Route element={<AuthLayout />}>
				<Route path={routes.feed.path} element={<Feed />} />
				<Route path={routes.profile.path} element={<Profile />} />
				<Route path={routes.messages.path} element={<Messages />} />
				<Route path={routes.friends.path} element={<Friends />} />
				<Route path={routes.settings.path} element={<Settings />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Router
