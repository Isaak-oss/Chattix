import { Box } from '@mui/material'
import { AuthWelcomeBanner } from '@shared/ui'
import type { ReactNode } from 'react'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex'
			}}
		>
			<AuthWelcomeBanner />
			<Box
				sx={{
					overflowY: 'auto',
					flex: 1,
					p: 6
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '100%'
					}}
				>
					<Box maxWidth={400} width="100%">
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
