import { CircularProgress, Stack } from '@mui/material'

export const Loader = () => {
	return (
		<Stack flex={1} alignItems="center" p={2}>
			<CircularProgress />
		</Stack>
	)
}
