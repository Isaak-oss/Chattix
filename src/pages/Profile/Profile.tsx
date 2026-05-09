import { Stack, Typography } from '@mui/material'
import { ScrollProvider } from '@shared/lib'
import { DataBoundary, PageWrapper } from '@shared/ui'
import { PostList } from '@widgets/PostList'
import { ProfileCard } from '@widgets/Profile'

export const Profile = () => {
	return (
		<DataBoundary>
			<ScrollProvider>
				<PageWrapper>
					<Stack gap={2}>
						<ProfileCard />
						<Typography variant="h4" pl={3}>
							Posts
						</Typography>
						<PostList />
					</Stack>
				</PageWrapper>
			</ScrollProvider>
		</DataBoundary>
	)
}
