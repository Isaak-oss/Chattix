import { DataBoundary, PageWrapper } from '@shared/ui'
import { Chat } from '@widgets/Chat'

export const Messages = () => {
	return (
		<DataBoundary>
			<PageWrapper title={'Messages'} subTitle={'Conversations'}>
				<Chat />
			</PageWrapper>
		</DataBoundary>
	)
}
