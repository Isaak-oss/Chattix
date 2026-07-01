import { useCurrentUser } from '@entities/user'
import { useBreakpoints } from '@shared/lib'

import { NavBarDesktop } from './NavBarDesktop.tsx'
import NavBarMobile from './NavBarMobile.tsx'

export const NavBar = () => {
	const { isMobile } = useBreakpoints()
	const user = useCurrentUser()

	if (isMobile) return <NavBarMobile user={user} />

	return <NavBarDesktop user={user} />
}
