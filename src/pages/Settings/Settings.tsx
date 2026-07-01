import { ProfileSettings } from '@features/settings'
import { SettingTabsEnum } from '@features/settings/model/types.ts'
import { AppearanceSetting } from '@features/settings/ui/AppearanceSetting.tsx'
import { PrivacySettings } from '@features/settings/ui/PrivacySettings.tsx'
import { SettingsTabs } from '@features/settings/ui/SettingsTabs.tsx'
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
