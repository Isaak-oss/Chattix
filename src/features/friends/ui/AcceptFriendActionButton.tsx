import { acceptFriend } from '@entities/friends'
import type { FriendsActionButtonProps } from '@features/friends'
import { useFriendsMutations } from '@features/friends/model/useFriendsMutations.ts'
import { SubmitButton } from '@shared/ui'

export const AcceptFriendActionButton = ({ requestId }: FriendsActionButtonProps) => {
	const { mutate } = useFriendsMutations(acceptFriend)

	return (
		<SubmitButton
			variant="contained"
			sx={{ flex: 1 }}
			onClick={() => mutate(requestId)}
			mode={'static'}
			successMessage={'Accepted'}
		>
			Accept
		</SubmitButton>
	)
}
