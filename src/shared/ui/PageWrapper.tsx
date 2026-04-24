import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type PageWrapperProps = {
	children: ReactNode
	title?: string
	subTitle?: string
}

export const PageWrapper = ({ children, title, subTitle }: PageWrapperProps) => {
	return (
		<Box
			sx={{
				maxWidth: 1100,
				mx: 'auto',
				p: { xs: 2, sm: 3 },
				display: 'flex',
				gap: 4,
				height: '100%'
			}}
		>
			<Stack sx={{ flex: 1, minWidth: 0 }}>
				<Box sx={{ mb: 4 }}>
					<Typography variant="overline">{subTitle}</Typography>
					<Typography variant="h4">{title}</Typography>
				</Box>
				{children}
			</Stack>
		</Box>
	)
}
