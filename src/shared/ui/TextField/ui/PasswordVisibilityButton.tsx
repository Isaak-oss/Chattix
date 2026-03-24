import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'

type PasswordVisibilityButtonProps = {
	isVisible: boolean
	onToggle: () => void
}

export const PasswordVisibilityButton = ({ isVisible, onToggle }: PasswordVisibilityButtonProps) => {
	return (
		<InputAdornment position="end">
			<IconButton onClick={onToggle} edge="end" size="small">
				{isVisible ? (
					<VisibilityOff
						fontSize="small"
						sx={{
							color: 'text.secondary'
						}}
					/>
				) : (
					<Visibility
						fontSize="small"
						sx={{
							color: 'text.secondary'
						}}
					/>
				)}
			</IconButton>
		</InputAdornment>
	)
}
