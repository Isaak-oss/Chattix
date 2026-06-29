import { languagesOptions, themeOptions } from '@features/settings/config/appearanceSettingOptions.ts'
import { SettingSection } from '@features/settings/ui/SettingSection.tsx'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	type PaletteMode,
	Select,
	type SelectChangeEvent,
	useColorScheme
} from '@mui/material'
import { useState } from 'react'

export const AppearanceSetting = () => {
	const { setMode, mode } = useColorScheme()

	const [language, setLanguage] = useState('')

	const handleChangeTheme = (event: SelectChangeEvent<PaletteMode | 'system'>) => {
		setMode(event.target.value)
	}

	const handleChangeLanguage = (event: SelectChangeEvent) => {
		setLanguage(event.target.value)
	}

	return (
		<SettingSection title="Appearance" description="Customize how the app looks" Icon={PaletteOutlinedIcon}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
				<FormControl size="small" variant="outlined">
					<InputLabel id="theme">Theme</InputLabel>
					<Select labelId="theme" id="theme" value={mode} onChange={handleChangeTheme} label="Theme">
						{themeOptions.map(theme => (
							<MenuItem value={theme.value}>{theme.label}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl size="small" variant="outlined">
					<InputLabel id="Language">Language</InputLabel>
					<Select labelId="Language" id="Language" value={language} onChange={handleChangeLanguage} label="Language">
						{languagesOptions.map(theme => (
							<MenuItem value={theme.value}>{theme.label}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</SettingSection>
	)
}
