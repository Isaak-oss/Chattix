import { Box } from '@mui/material'
import { Loader } from '@shared/ui'

export const LoaderScreen = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				width: '100vw'
			}}
		>
			<Loader />
		</Box>
	)
}
