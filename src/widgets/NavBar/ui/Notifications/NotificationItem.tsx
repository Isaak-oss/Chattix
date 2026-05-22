import {
	type Notification,
	NotificationType,
	deleteNotification as deleteNotificationMutation,
	readNotification as readNotificationMutation,
	useNotificationsStore
} from '@entities/notifications'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { NOTIFICATIONS_QUERY_KEY, routes } from '@shared/config'
import { removeItemFromInfiniteQuery } from '@shared/lib/reactQuery/removeItemFromInfiniteQuery.ts'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router'

type NotificationItemProps = {
	notification: Notification
	onClose: () => void
}

export const NotificationItem = memo(({ notification, onClose }: NotificationItemProps) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const [isRead, setRead] = useState(!!notification.readAt)
	const { readNotification, deleteNotification } = useNotificationsStore()

	const onRead = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setRead(true)
		readNotification()
		readNotificationMutation(notification.id)
	}

	const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		queryClient.setQueriesData<InfiniteData<ApiResponse<Notification[]>>>(
			{ queryKey: [NOTIFICATIONS_QUERY_KEY] },
			old => removeItemFromInfiniteQuery(notification.id, old, notification => notification.id)
		)
		deleteNotification(isRead)
		deleteNotificationMutation(notification.id)
	}

	const onNotificationClick = () => {
		switch (notification.type) {
			case NotificationType.FRIEND_ACCEPTED:
				navigate(routes.friends.path)
				onClose()
				break
			case NotificationType.FRIEND_REJECTED:
				navigate(routes.friends.path)
				onClose()
				break
			case NotificationType.FRIEND_REMOVED:
				navigate(routes.friends.path)
				onClose()
				break
			case NotificationType.FRIEND_REQUEST:
				navigate(routes.friends.path)
				onClose()
				break
			default:
				break
		}
	}

	return (
		<Box
			sx={{ bgcolor: isRead ? 'transparent' : 'secondary.light', opacity: isRead ? 0.8 : 1, cursor: 'pointer' }}
			onClick={onNotificationClick}
		>
			<Stack flexDirection="row" p={2} alignItems="flex-start">
				<Box flex={1}>
					<Typography variant="body1">{notification.title}</Typography>
					<Typography variant="body2">{notification.message}</Typography>
				</Box>
				<Box>
					{!isRead && (
						<IconButton size="small" onClick={onRead}>
							<CheckIcon fontSize="small" />
						</IconButton>
					)}
					<IconButton size="small" onClick={onDelete}>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Box>
			</Stack>
			<Divider />
		</Box>
	)
})
