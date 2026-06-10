import { CHAT_ROOM_ID_SEARCH_PARAM } from '@shared/config'
import { useSearchParams } from 'react-router-dom'

export const useChatRoomId = () => {
	const [searchQuery, setSearchQuery] = useSearchParams()
	const chatRoomId = searchQuery.get(CHAT_ROOM_ID_SEARCH_PARAM)!

	const setSelectedChatRoomId = (chatRoomId?: string | null) => {
		if (!chatRoomId) {
			setSearchQuery('')
		} else {
			setSearchQuery({ [CHAT_ROOM_ID_SEARCH_PARAM]: chatRoomId })
		}
	}

	return { chatRoomId, setSelectedChatRoomId }
}
