import { Box, Container, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type PageWrapperProps = {
	children: ReactNode
	title?: string
	subTitle?: string
}

export const PageWrapper = ({ children, title, subTitle }: PageWrapperProps) => {
	return (
		<Container
			sx={{
				display: 'flex',
				gap: 4,
				height: '100%'
			}}
		>
			<Stack sx={{ flex: 1, minWidth: 0 }}>
				{(title || subTitle) && (
					<Box sx={{ mb: 4 }}>
						{subTitle && (
							<Typography variant="overline" color="secondary.main">
								{subTitle}
							</Typography>
						)}
						{title && <Typography variant="h4">{title}</Typography>}
					</Box>
				)}
				{children}
			</Stack>
		</Container>
	)
}
