import { Box, Typography } from '@mui/material'
import { ScrollProvider } from '@shared/lib'
import { DataList } from '@shared/ui'
import { useNotifications } from '@widgets/NavBar/model/useNotifications.ts'
import { NotificationItem } from '@widgets/NavBar/ui/Notifications/NotificationItem.tsx'

type NotificationsContentProps = {
	onClose: () => void
}

export const NotificationsContent = ({ onClose }: NotificationsContentProps) => {
	const { notifications, isLoading, isFetching, hasNextPage, isRefetching, isFetchingNextPage, fetchNextPage } =
		useNotifications()

	return (
		<Box
			sx={{
				borderRadius: 2,
				height: 500,
				width: 400,
				bgcolor: 'background.default',
				overflow: 'hidden',
				position: 'relative',
				boxShadow: '0 2px 8px rgba(26, 26, 26, 0.15)'
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
				<DataList
					data={notifications}
					renderItem={notification => <NotificationItem notification={notification} onClose={onClose}/>}
					isFetching={isFetching}
					hasNextPage={hasNextPage}
					isRefetching={isRefetching}
					isFetchingNextPage={isFetchingNextPage}
					onLoadMore={fetchNextPage}
					isDataLoading={isLoading}
					emptyListTitle={'Empty'}
					gap={1}
				/>
			</ScrollProvider>
		</Box>
	)
}
