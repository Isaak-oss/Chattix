import { Box, Typography } from '@mui/material'
import { ScrollProvider } from '@shared/lib'
import { InfinityDataList } from '@shared/ui'
import { useNotifications } from '@widgets/NavBar/model/useNotifications.ts'
import { NotificationItem } from '@widgets/NavBar/ui/Notifications/NotificationItem.tsx'

type NotificationsContentProps = {
	onClose: () => void
}

export const NotificationsContent = ({ onClose }: NotificationsContentProps) => {
	const notificationsQuery = useNotifications()

	return (
		<Box
			sx={{
				borderRadius: 2,
				height: 500,
				width: 400,
				bgcolor: 'background.default',
				overflow: 'hidden',
				position: 'relative',
				boxShadow: theme => `0 2px 8px ${theme.palette.background.lowShadow}`
			}}
		>
			<Box
				sx={{
					bgcolor: 'background.paper',
					p: 1
				}}
			>
				<Typography variant="h6" textAlign="center" color="text.primary" fontFamily={'fontFamily'}>
					Notifications
				</Typography>
			</Box>
			<ScrollProvider>
				<InfinityDataList
					query={notificationsQuery}
					renderItem={notification => <NotificationItem notification={notification} onClose={onClose} />}
					emptyListTitle={'Empty'}
					gap={1}
				/>
			</ScrollProvider>
		</Box>
	)
}
