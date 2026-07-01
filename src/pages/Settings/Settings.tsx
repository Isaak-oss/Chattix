import { AppearanceSetting, PrivacySettings, ProfileSettings, SettingTabsEnum, SettingsTabs } from '@features/settings'
import { PageWrapper } from '@shared/ui'
import { useState } from 'react'

const renderTabContent = (tab: SettingTabsEnum) => {
	switch (tab) {
		case SettingTabsEnum.PRIVACY:
			return <PrivacySettings />
		case SettingTabsEnum.SYSTEM:
			return <AppearanceSetting />
		default:
			return <ProfileSettings />
	}
}

export const Settings = () => {
	const [tab, setTab] = useState<SettingTabsEnum>(SettingTabsEnum.PROFILE)

	return (
		<PageWrapper title="Settings" subTitle="Preferences">
			<SettingsTabs tab={tab} setTab={setTab} />
			{renderTabContent(tab)}
		</PageWrapper>
	)
}
