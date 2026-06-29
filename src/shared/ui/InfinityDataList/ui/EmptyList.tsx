import { Typography } from '@mui/material'

export const EmptyList = ({ title }: { title?: string }) => {
	return (
		<Typography variant="h6" textAlign="center" color="text.secondary">
			{title || 'No Items'}
		</Typography>
	)
}
