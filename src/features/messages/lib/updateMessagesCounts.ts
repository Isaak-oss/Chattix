import type { UnreadMessages } from '@entities/chat'
import { UNREAD_MESSAGES_COUNT_QUERY_KEY } from '@shared/config'
import { queryClient } from '@shared/reactQuery'

export const updateMessagesCount = (unreadMessagesCount: number) => {
	queryClient.setQueriesData<UnreadMessages>(
		{ queryKey: [UNREAD_MESSAGES_COUNT_QUERY_KEY], exact: true },
		{ unreadMessagesCount }
	)
}
