import { CircularProgress, Stack, type StackProps } from '@mui/material'

export const Loader = ({ ...rest }: StackProps) => {
	return (
		<Stack flex={1} alignItems="center" p={2} {...rest}>
			<CircularProgress />
		</Stack>
	)
}
