import AuthLayout from '@app/layout/AuthLayout.tsx'
import GuestGuard from '@app/layout/GuestGuard.tsx'
import { SignIn, SignUp } from '@pages/Auth'
import { Feed } from '@pages/Feed/Feed.tsx'
import { Friends } from '@pages/Friends/Friends.tsx'
import { Messages } from '@pages/Messages/Messages.tsx'
import { NotFound } from '@pages/NotFound/NotFound.tsx'
import { Profile } from '@pages/Profile/Profile.tsx'
import { Settings } from '@pages/Settings/Settings.tsx'
import { routes } from '@shared/config'
import { Navigate, Route, Routes } from 'react-router-dom'

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={routes.authSignIn.path} />} />

			<Route element={<GuestGuard />}>
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
