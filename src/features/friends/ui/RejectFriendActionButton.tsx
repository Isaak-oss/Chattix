import { rejectFriend } from '@entities/friends'
import type { FriendsActionButtonProps } from '@features/friends'
import { useFriendsMutations } from '@features/friends/model/useFriendsMutations.ts'
import { SubmitButton } from '@shared/ui'

export const RejectFriendActionButton = ({ requestId }: FriendsActionButtonProps) => {
	const { mutate } = useFriendsMutations(rejectFriend)

	return (
		<SubmitButton
			variant="outlined"
			sx={{ flex: 1 }}
			onClick={() => mutate(requestId)}
			mode={'static'}
			successMessage={'Rejected'}
		>
			Reject
		</SubmitButton>
	)
}
