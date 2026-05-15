import { type Friend, FriendStatusQuery, type FriendsCount } from '@entities/friends'
import { apiClient } from '@shared/api'

const limit = 10

// QUERY
export const getFriends = async (
	offset: number = 0,
	status: FriendStatusQuery = FriendStatusQuery.ACCEPTED,
	signal: AbortSignal
) => {
	return apiClient.get<Friend[]>(`/friends?offset=${offset}&limit=${limit}&status=${status}`, { signal })
}

export const getFriendsCount = async () => {
	const friendsCount = await apiClient.get<FriendsCount>(`/friends/count`)
	return friendsCount?.data
}

export const getSuggestedFriends = async (offset: number = 0, signal: AbortSignal) => {
	return apiClient.get<Friend[]>(`/friends/suggested?offset=${offset}&limit=${limit}`, { signal })
}

// MUTATION
export const addFriend = async (receiverId: Id) => {
	return apiClient.patch<Friend>(`/friends/sendRequest/${receiverId}`)
}

export const acceptFriend = async (receiverId: Id) => {
	return apiClient.put<Friend>(`/friends/acceptRequest/${receiverId}`)
}

export const rejectFriend = async (receiverId: Id) => {
	return apiClient.put<Friend>(`/friends/rejectRequest/${receiverId}`)
}

export const deleteFriend = async (friendId: Id) => {
	return apiClient.delete<Friend>(`/friends/removeFriend/${friendId}`)
}
