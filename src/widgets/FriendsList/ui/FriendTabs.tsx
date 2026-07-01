import { getFriendsCount } from '@entities/friends'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'
import UpcomingIcon from '@mui/icons-material/Upcoming'
import { Box, Tab, Tabs } from '@mui/material'
import { FRIENDS_COUNT_QUERY_KEY } from '@shared/config'
import { useQuery } from '@tanstack/react-query'
import { FriendTabsEnum } from '@widgets/FriendsList'

type FriendStatusTabsProps = {
	tab: FriendTabsEnum
	setTab: (tab: FriendTabsEnum) => void
}

const tabsList = [
	{
		label: FriendTabsEnum.FRIENDS,
		tab: FriendTabsEnum.FRIENDS,
		icon: HowToRegIcon,
		countBoxParams: {
			color: 'text.secondary',
			bgColor: 'divider'
		}
	},
	{
		label: FriendTabsEnum.INCOMING,
		tab: FriendTabsEnum.INCOMING,
		icon: UpcomingIcon,
		countBoxParams: {
			color: 'text.primary',
			bgColor: 'secondary.main'
		}
	},
	{
		label: FriendTabsEnum.OUTGOING,
		tab: FriendTabsEnum.OUTGOING,
		icon: ScheduleSendIcon,
		countBoxParams: {
			color: 'text.primary',
			bgColor: 'secondary.main'
		}
	},
	{
		label: FriendTabsEnum.DISCOVER,
		tab: FriendTabsEnum.DISCOVER,
		icon: PersonAddAltSharpIcon
	},
	{
		label: FriendTabsEnum.REJECTED,
		tab: FriendTabsEnum.REJECTED,
		icon: DoDisturbIcon
	}
]

export const FriendTabs = ({ tab, setTab }: FriendStatusTabsProps) => {
	const { data } = useQuery({
		queryKey: [FRIENDS_COUNT_QUERY_KEY],
		queryFn: getFriendsCount,
		gcTime: 0
	})

	const counts = {
		[FriendTabsEnum.FRIENDS]: data?.friends,
		[FriendTabsEnum.INCOMING]: data?.incoming,
		[FriendTabsEnum.OUTGOING]: data?.outgoing,
		[FriendTabsEnum.DISCOVER]: null,
		[FriendTabsEnum.REJECTED]: null
	}

	return (
		<Box sx={{ mb: 3 }}>
			<Tabs
				value={tab}
				onChange={(_, newTab) => setTab(newTab)}
				variant="scrollable"
				scrollButtons="auto"
				allowScrollButtonsMobile
				sx={{
					maxWidth: '100%',
					'& .MuiTabs-indicator': {
						bgcolor: 'text.primary',
						height: 2
					},
					'& .MuiTab-root': {
						fontWeight: 500,
						fontSize: 14,
						color: 'text.secondary',
						textTransform: 'none',
						minHeight: 44,
						px: { xs: 1, sm: 0 },
						mr: { xs: 1, sm: 4 },
						'&.Mui-selected': { color: 'text.primary' }
					}
				}}
			>
				{tabsList.map(tabItem => (
					<Tab
						key={tabItem.tab}
						value={tabItem.tab}
						disableRipple
						label={
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
								<tabItem.icon fontSize="small" />
								<span>{tabItem.label}</span>
								{tabItem.countBoxParams && (
									<Box
										sx={{
											px: 0.75,
											py: 0.25,
											borderRadius: 1,
											bgcolor: tab === tabItem.tab ? 'text.primary' : tabItem.countBoxParams.bgColor,
											color: tab === tabItem.tab ? 'primary.dark' : tabItem.countBoxParams.color,
											fontSize: 11,
											fontWeight: 600
										}}
									>
										{counts[tabItem.tab] || 0}
									</Box>
								)}
							</Box>
						}
					/>
				))}
			</Tabs>
		</Box>
	)
}
