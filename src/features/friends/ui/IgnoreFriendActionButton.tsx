import { rejectFriend } from '@entities/friends'
import type { FriendsActionButtonProps } from '@features/friends'
import { useFriendsMutations } from '@features/friends/model/useFriendsMutations.ts'
import { SubmitButton } from '@shared/ui'

export const IgnoreFriendActionButton = ({ requestId }: FriendsActionButtonProps) => {
	const { mutate } = useFriendsMutations(rejectFriend)

	return (
		<SubmitButton variant="contained" onClick={() => mutate(requestId)} mode={'static'} successMessage={'Rejected'}>
			Ignore
		</SubmitButton>
	)
}
