import { useMediaQuery } from '@mui/material'

export const useBreakpoints = () => {
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
	const isTablet = useMediaQuery(theme => theme.breakpoints.between('sm', 'md'))
	const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'))

	return { isMobile, isTablet, isDesktop }
}
