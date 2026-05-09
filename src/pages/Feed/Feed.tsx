import { ScrollProvider } from '@shared/lib/ScrollProvider.tsx'
import { DataBoundary, PageWrapper } from '@shared/ui'
import { PostList } from '@widgets/PostList'

export const Feed = () => {
	return (
		<DataBoundary>
			<ScrollProvider>
				<PageWrapper title={'Latest Updates'} subTitle={'Your Feed'}>
					<PostList />
				</PageWrapper>
			</ScrollProvider>
		</DataBoundary>
	)
}
