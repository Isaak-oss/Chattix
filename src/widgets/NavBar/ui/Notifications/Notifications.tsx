import { Box, ClickAwayListener, Fade, Popper } from '@mui/material'
import { NotificationsButton } from '@widgets/NavBar/ui/Notifications/NotificationsButton.tsx'
import { NotificationsContent } from '@widgets/NavBar/ui/Notifications/NotificationsContent.tsx'
import React, { useState } from 'react'

export const Notifications = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (anchorEl) {
			setAnchorEl(null)
		} else {
			setAnchorEl(event.currentTarget)
		}
	}

	const onClose = () => {
		setAnchorEl(null)
	}

	const isOpen = Boolean(anchorEl)

	return (
		<Box ml={'auto'} onClick={e => e.stopPropagation()}>
			<NotificationsButton handleToggle={handleToggle} isOpen={isOpen} />
			<ClickAwayListener onClickAway={onClose}>
				<Popper anchorEl={anchorEl} open={!!anchorEl} placement="bottom" transition sx={{ zIndex: 10 }}>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={200}>
							<Box>
								<NotificationsContent onClose={onClose} />
							</Box>
						</Fade>
					)}
				</Popper>
			</ClickAwayListener>
		</Box>
	)
}
