import { ScrollProvider } from '@shared/lib/ScrollProvider.tsx'
import { DataBoundary, PageWrapper } from '@shared/ui'
import { PostList } from '@widgets/PostList'

export const Feed = () => {
	return (
		<DataBoundary>
			<PageWrapper title={'Latest Updates'} subTitle={'Your Feed'}>
				<ScrollProvider>
					<PostList />
				</ScrollProvider>
			</PageWrapper>
		</DataBoundary>
	)
}
