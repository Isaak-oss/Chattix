import { Alert, Stack } from '@mui/material'
import type { ReactNode } from 'react'

export const FieldsContainer = ({ children, error }: { children: ReactNode; error?: string }) => {
	return (
		<Stack gap={3}>
			{children}
			{error && (
				<Alert
					severity="error"
					sx={{
						borderRadius: 2,
						border: '1px solid',
						borderColor: 'error.light',
						bgcolor: 'error.hover'
					}}
				>
					{error}
				</Alert>
			)}
		</Stack>
	)
}
