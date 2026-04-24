import { Box, Button, Typography } from '@mui/material'

export const ErrorScreen = ({ reset }: { reset?: () => void }) => {
	const onReset = () => {
		if (reset) {
			reset()
		} else {
			window.location.reload()
		}
	}

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			<Typography variant="h6">Something went wrong</Typography>
			<Button onClick={onReset}>Try Again</Button>
		</Box>
	)
}
