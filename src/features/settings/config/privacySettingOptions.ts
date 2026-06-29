import { ProfileVisibility, WhoCanMessage } from '@entities/user'

export const profileVisibilityOptions = [
	{ label: 'Public', value: ProfileVisibility.PUBLIC },
	{ label: 'Private', value: ProfileVisibility.PRIVATE },
	{ label: 'Friends Only', value: ProfileVisibility.FRIENDS_ONLY }
]

export const whoCanMessageOptions = [
	{ label: 'Everyone', value: WhoCanMessage.EVERYONE },
	{ label: 'Friends Only', value: WhoCanMessage.FRIENDS_ONLY }
]
