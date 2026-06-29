import { type Friend, FriendStatus } from '@entities/friends'
import { AcceptFriendActionButton, AddFriendActionButton, RejectFriendActionButton } from '@features/friends'
import { MessageActionButton } from '@features/friends/ui/MessageActionButton.tsx'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { memo } from 'react'

type FriendCardProps = {
	friend: Friend
}

export const FriendCard = memo(({ friend }: FriendCardProps) => {
	const isFriend = friend.friendStatus === FriendStatus.ACCEPTED
	const isIncoming = friend.friendStatus === FriendStatus.INCOMING
	const isOutgoing = friend.friendStatus === FriendStatus.OUTGOING
	const isPending = isIncoming || isOutgoing
	const isRejectedByMe = friend.friendStatus === FriendStatus.REJECTED_BY_ME
	const isRejectedByUser = friend.friendStatus === FriendStatus.REJECTED_BY_USER
	const isSuggest = !friend.friendStatus

	return (
		<Card sx={{ width: '100%', maxWidth: '100%' }}>
			<CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
				<Stack alignItems="center">
					<UserAvatar
						variant="medium"
						userName={friend.name}
						isOnline={friend.isOnline}
						sx={{
							bgcolor: isFriend ? 'primary.main' : 'secondary.main',
							color: isPending ? 'primary.main' : 'primary.contrastText'
						}}
					/>
					<Typography variant="subtitle2" mt={2}>
						{friend.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						@{friend.name}
					</Typography>

					<Stack mt={2} width="100%" gap={1} flexWrap="wrap" flexDirection={{ xs: 'column', sm: 'row' }}>
						{/* Actions */}
						{isFriend && <MessageActionButton user={friend} />}
						{isIncoming && (
							<>
								<AcceptFriendActionButton requestId={friend.friendRequestId!} />
								<RejectFriendActionButton requestId={friend.friendRequestId!} />
							</>
						)}
						{isRejectedByMe && (
							<>
								<AcceptFriendActionButton requestId={friend.friendRequestId!} />
							</>
						)}
						{isRejectedByUser && (
							<Button variant="outlined" fullWidth size="small" color={'error'} disabled>
								You've been blocked by {friend.name}
							</Button>
						)}
						{isOutgoing && (
							<Button variant="outlined" fullWidth size="small" disabled>
								Waiting for accept
							</Button>
						)}
						{isSuggest && <AddFriendActionButton userId={friend.id} />}
						{/*{isRejectedByMe ? }*/}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	)
})
