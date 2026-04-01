import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'
import { routes } from '@shared/config'
import type { LinkItem } from '@widgets/NavBar'

export const links = (profileId: Id): LinkItem[] => [
	{ label: 'Feed', icon: HomeOutlinedIcon, page: routes.feed.path },
	{ label: 'Profile', icon: PersonOutlinedIcon, page: routes.profile.build({ profileId }) },
	{ label: 'Messages', icon: EmailOutlinedIcon, page: routes.messages.path },
	{ label: 'Friends', icon: GroupOutlinedIcon, page: routes.friends.path },
	{ label: 'Settings', icon: SettingsSuggestOutlinedIcon, page: routes.settings.path }
]
