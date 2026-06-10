import type { User } from '@entities/user'
import type { BaseEntity } from '@globalTypes/base.ts'

export type ChatRoomType = 'direct' | 'group'

export type UnreadMessages = {
	unreadMessages: number
}

export type Message = PartialKeys<BaseEntity, 'createdAt'> & {
	content: string
	chatRoomId: Id
	sender: User
	senderId: Id
}

// TODO: check types
export type ChatRoomReadState = BaseEntity & {
	chatRoomId: Id
	userId: Id
	lastReadMessageId: Id
	lastReadAt: string
}

export type ChatRoom = BaseEntity & {
	name: string
	participants: User[]
	readStates: ChatRoomReadState[] | []
	type: ChatRoomType
}

export type CreateDirectChatRoomBody = {
	to: Id // UserId
	firstMessage: string
}

export type SendMessageBody = {
	content: string
}

export type NewMessageWebSocket = {
	data: Message & { chatRoom: ChatRoom }
	unreadCount: number
}
