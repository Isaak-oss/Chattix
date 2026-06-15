import type {
	ChatRoom,
	CreateDirectChatRoomBody,
	Message,
	SendMessageBody,
	UnreadMessages
} from '@entities/chat/model/types.ts'
import { apiClient } from '@shared/api'

const chatRoomsLimit = 20
const messagesLimit = 50

// QUERY
export const getChatRooms = async (offset: number = 0) => {
	return apiClient.get<ChatRoom[]>(`chats/rooms?offset=${offset}&limit=${chatRoomsLimit}`)
}

export const getUnreadMessagesCount = async () => {
	const res = await apiClient.get<UnreadMessages>(`chats/unreadMessages`)
	return res.data
}

export const getRoomMessages = async (offset: number = 0, roomId: Id) => {
	return await apiClient.get<Message[]>(`/chats/rooms/${roomId}/messages?offset=${offset}&limit=${messagesLimit}`)
}

export const getChatRoom = async (roomId: Id) => {
	const res = await apiClient.get<ChatRoom>(`/chats/rooms/${roomId}`)
	return res.data
}

// MUTATION
export const createDirectChatRoom = async (data: CreateDirectChatRoomBody) => {
	const res = await apiClient.post<ChatRoom, CreateDirectChatRoomBody>(`/chats/rooms`, data)
	return res.data
}

export const sendMessage = async (roomId: Id, data: SendMessageBody) => {
	const res = await apiClient.post<Message, SendMessageBody>(`/chats/rooms/${roomId}/messages`, data)
	return res.data
}
