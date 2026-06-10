import { type ChatRoom, type Message, createDirectChatRoom, sendMessage } from '@entities/chat'
import { useMe } from '@entities/user'
import SendIcon from '@mui/icons-material/Send'
import { Box, IconButton, TextField } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { CHAT_ROOMS_MESSAGES_QUERY_KEY, CHAT_ROOMS_QUERY_KEY, CHAT_ROOM_ID_SEARCH_PARAM } from '@shared/config'
import { addItemToInfiniteQuery, updateItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useSelectedChatRoom } from '@widgets/Chat/model/useSelectedChatRoom.ts'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const MessageInput = () => {
	const [_, setSearchParams] = useSearchParams()
	const { data } = useMe()
	const me = data!.data

	const { chatRoomId } = useChatRoomId()
	const { selectedChatRoom } = useSelectedChatRoom()

	const sendTo = selectedChatRoom?.participants.find(({ id }) => id !== me.id)

	const queryClient = useQueryClient()
	const [newMessage, setNewMessage] = useState('')

	const addItemToLocalMessagesList = () => {
		queryClient.setQueriesData<InfiniteData<ApiResponse<Message[]>>>(
			{ queryKey: [CHAT_ROOMS_MESSAGES_QUERY_KEY, chatRoomId] },
			old => {
				return addItemToInfiniteQuery(
					{
						id: 'new',
						content: newMessage,
						chatRoomId: chatRoomId,
						senderId: me.id,
						sender: me
					},
					old
				)
			}
		)
	}

	const addItemToLocalChatRoomsList = (chatRoom: ChatRoom) => {
		queryClient.setQueriesData<InfiniteData<ApiResponse<ChatRoom[]>>>({ queryKey: [CHAT_ROOMS_QUERY_KEY] }, old => {
			return addItemToInfiniteQuery(chatRoom, old)
		})
	}

	const updateMessage = (message: Message) => {
		queryClient.setQueriesData<InfiniteData<ApiResponse<Message[]>>>(
			{ queryKey: [CHAT_ROOMS_MESSAGES_QUERY_KEY, chatRoomId] },
			old => {
				return updateItemToInfiniteQuery(message, { key: 'id', customValue: 'new' }, old)
			}
		)
	}

	const handleSend = async () => {
		setNewMessage('')
		// local update on new message
		addItemToLocalMessagesList()

		try {
			if (chatRoomId === 'new') {
				const res = await createDirectChatRoom({ to: sendTo!.id, firstMessage: newMessage })
				setSearchParams({ [CHAT_ROOM_ID_SEARCH_PARAM]: res.id })
				addItemToLocalChatRoomsList(res)
			} else {
				const res = await sendMessage(chatRoomId, { content: newMessage })
				updateMessage(res)
			}
		} catch (error) {
			// 	TODO: add error notification
			console.log(error)
		}
	}

	return (
		<Box
			sx={{
				p: 2.5,
				borderTop: '1px solid rgba(26,26,26,0.06)',
				display: 'flex',
				gap: 1.5,
				alignItems: 'center',
				bgcolor: '#fefefe'
			}}
		>
			<TextField
				fullWidth
				size="small"
				placeholder="Type a message..."
				value={newMessage}
				onChange={e => setNewMessage(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && handleSend()}
			/>
			<IconButton onClick={handleSend} disabled={!newMessage.trim()}>
				<SendIcon fontSize="small" />
			</IconButton>
		</Box>
	)
}
