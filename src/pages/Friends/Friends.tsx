import { ScrollProvider } from '@shared/lib'
import { DataBoundary, PageWrapper } from '@shared/ui'
import { FriendsList } from '@widgets/FriendsList'

export const Friends = () => {
	return (
		<DataBoundary>
			<ScrollProvider>
				<PageWrapper title={'Connections'} subTitle={'Your Network'}>
					<FriendsList />
				</PageWrapper>
			</ScrollProvider>
		</DataBoundary>
	)
}
