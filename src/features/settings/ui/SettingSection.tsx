import { Box, Card, CardContent, Divider, type SvgIconProps, Typography } from '@mui/material'
import type { ComponentType, ReactNode } from 'react'

type SettingSectionProps = {
	Icon: ComponentType<SvgIconProps>
	title: ReactNode
	description: string
	children: ReactNode
}

export const SettingSection = ({ children, Icon, title, description }: SettingSectionProps) => {
	return (
		<Card>
			<CardContent sx={{ p: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: 1.5,
							bgcolor: 'primary.main',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						{<Icon fontSize="small" sx={{ color: 'background.default' }} />}
					</Box>
					<Box>
						<Typography variant="body1" color="primary.main">
							{title}
						</Typography>
						<Typography variant="caption" sx={{ color: 'text.secondary' }}>
							{description}
						</Typography>
					</Box>
				</Box>
				<Divider sx={{ mb: 2.5 }} />
				{children}
			</CardContent>
		</Card>
	)
}
