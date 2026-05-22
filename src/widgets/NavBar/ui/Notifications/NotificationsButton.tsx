import { useNotificationsStore} from '@entities/notifications'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { Badge, IconButton } from '@mui/material'
import React from 'react'

type NotificationsButtonProps = {
	handleToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
	isOpen: boolean
}

export const NotificationsButton = ({ handleToggle, isOpen }: NotificationsButtonProps) => {
	const { count } = useNotificationsStore()

	return (
		<IconButton onClick={handleToggle} size={'small'}>
			<Badge badgeContent={count.unread} max={9}>
				{isOpen ? (
					<NotificationsIcon fontSize="medium" sx={{ color: 'secondary.main' }} />
				) : (
					<NotificationsOutlinedIcon fontSize="medium" sx={{ color: 'secondary.main' }} />
				)}
			</Badge>
		</IconButton>
	)
}
