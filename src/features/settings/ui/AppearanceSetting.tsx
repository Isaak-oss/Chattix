import { languagesOptions, themeOptions } from '@features/settings/config/appearanceSettingOptions.ts'
import { SettingSection } from '@features/settings/ui/SettingSection.tsx'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import {
	Box,
	MenuItem,
	type PaletteMode,
	TextField,
	useColorScheme
} from '@mui/material'
import { type ChangeEvent, useState } from 'react'

export const AppearanceSetting = () => {
	const { setMode, mode } = useColorScheme()

	const [language, setLanguage] = useState('')

	const handleChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
		setMode(event.target.value as PaletteMode | 'system')
	}

	const handleChangeLanguage = (event: ChangeEvent<HTMLInputElement>) => {
		setLanguage(event.target.value)
	}

	return (
		<SettingSection title="Appearance" description="Customize how the app looks" Icon={PaletteOutlinedIcon}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
				<TextField size="small" select label={'Theme'} onChange={handleChangeTheme} value={mode}>
					{themeOptions.map(theme => (
						<MenuItem value={theme.value}>{theme.label}</MenuItem>
					))}
				</TextField>
				<TextField size="small" select label={'Language'} onChange={handleChangeLanguage} value={language}>
					{languagesOptions.map(language => (
						<MenuItem value={language.value}>{language.label}</MenuItem>
					))}
				</TextField>
			</Box>
		</SettingSection>
	)
}
