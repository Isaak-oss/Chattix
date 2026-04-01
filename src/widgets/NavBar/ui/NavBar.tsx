import { useUser } from '@entities/user'
import { useBreakpoints } from '@shared/lib'
import { NavBarDesktop } from '@widgets/NavBar/ui/NavBarDesktop.tsx'
import NavBarMobile from '@widgets/NavBar/ui/NavBarMobile.tsx'

export const NavBar = () => {
	const { isMobile } = useBreakpoints()

	const { data } = useUser()
	const user = data!.data

	if (isMobile) return <NavBarMobile user={user} />

	return <NavBarDesktop user={user} />
}
