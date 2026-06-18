import { Avatar, type AvatarProps, Badge } from '@mui/material'

type UserAvatarProps = AvatarProps & {
	userName?: string
	isOnline?: boolean
	badgeSize?: number
}

export const UserAvatar = ({ userName, isOnline, badgeSize, ...rest }: UserAvatarProps) => {
	return (
		<Badge
			overlap="circular"
			sx={{
				'& .MuiBadge-badge': {
					bgcolor: 'success.light',
					border: '2px solid white',
					width: badgeSize || 13,
					height: badgeSize || 13,
					borderRadius: '50%'
				}
			}}
			variant="dot"
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			invisible={typeof isOnline === 'boolean' ? !isOnline : true}
		>
			<Avatar {...rest}>{userName?.charAt(0)}</Avatar>
		</Badge>
	)
}
