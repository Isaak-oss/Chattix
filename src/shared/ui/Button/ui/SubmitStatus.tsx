import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Stack, Typography, keyframes } from '@mui/material'
import type { SubmitButtonStatuses } from '@shared/ui'

type SubmitStatusProps = {
	status: SubmitButtonStatuses
	successMessage?: string
	failedMessage?: string
}

const checkAnimation = keyframes`
	0% {
		transform: scale(0);
		opacity: 0;
	}
	50% {
		transform: scale(1.4);
		opacity: 1;
	}
	100% {
		transform: scale(0.8);
		opacity: 1;
	}
`

export const SubmitStatus = ({ status, successMessage, failedMessage }: SubmitStatusProps) => {
	const isSuccess = status === 'success'
	const isFailed = status === 'failed'
	const hasMessage = (isSuccess && successMessage) || (isFailed && failedMessage)

	const Icon = isSuccess ? DoneIcon : CloseIcon

	return (
		<Stack flexDirection="row" alignItems="center" gap={1}>
			<Icon
				sx={{
					animation: `${checkAnimation} 0.5s ease-out`
				}}
			/>

			{hasMessage && <Typography variant="body3">{isSuccess ? successMessage : failedMessage}</Typography>}
		</Stack>
	)
}
