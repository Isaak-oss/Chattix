import { SettingTabsEnum } from '@features/settings/model/types.ts'
import { Box, Tab, Tabs } from '@mui/material'

type SettingTabsProps = {
	tab: SettingTabsEnum
	setTab: (tab: SettingTabsEnum) => void
}

const tabsList = [
	{
		tab: SettingTabsEnum.PROFILE
	},
	{
		tab: SettingTabsEnum.PRIVACY
	},
	{
		tab: SettingTabsEnum.SYSTEM
	}
]

export const SettingsTabs = ({ tab, setTab }: SettingTabsProps) => {
	return (
		<Tabs
			value={tab}
			onChange={(_, newTab) => setTab(newTab)}
			variant="scrollable"
			scrollButtons="auto"
			allowScrollButtonsMobile
			sx={{
				maxWidth: '100%',
				mb: 2,
				'& .MuiTabs-indicator': {
					bgcolor: '#1a1a1a',
					height: 2
				},
				'& .MuiTab-root': {
					fontWeight: 500,
					fontSize: 14,
					color: '#6b6b6b',
					textTransform: 'none',
					minHeight: 44,
					px: { xs: 1, sm: 0 },
					mr: { xs: 1, sm: 4 },
					'&.Mui-selected': { color: '#1a1a1a' }
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
							<span>{tabItem.tab}</span>
						</Box>
					}
				/>
			))}
		</Tabs>
	)
}
