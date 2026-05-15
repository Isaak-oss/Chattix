import { addFriend } from '@entities/friends'
import { useFriendsMutations } from '@features/friends/model/useFriendsMutations.ts'
import { SubmitButton } from '@shared/ui'

export const AddFriendActionButton = ({ userId }: { userId: Id }) => {
	const { mutate } = useFriendsMutations(addFriend)

	return (
		<SubmitButton variant="contained" onClick={() => mutate(userId)} mode={'static'} successMessage={'Sent'}>
			Add Friend
		</SubmitButton>
	)
}
