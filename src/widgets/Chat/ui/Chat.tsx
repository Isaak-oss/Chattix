import { Card, Stack } from '@mui/material'
import { ChatMessages } from '@widgets/Chat/ui/ChatMessages/ChatMessages.tsx'
import { ChatRooms } from '@widgets/Chat/ui/ChatRooms/ChatRooms.tsx'

export const Chat = () => {
	return (
		<Card
			sx={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				minWidth: 0,
				overflow: 'hidden'
			}}
		>
			<Stack flexDirection="row" flex={1} minHeight={0} minWidth={0}>
				<ChatRooms />
				<ChatMessages />
			</Stack>
		</Card>
	)
}
