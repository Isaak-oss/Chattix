import { Button, type ButtonProps } from '@mui/material'
import { timeoutDelay } from '@shared/config'
import { type SubmitButtonModes, type SubmitButtonStatuses, SubmitStatus } from '@shared/ui'
import React, { type ReactNode, useState } from 'react'

type SubmitButtonProps = ButtonProps & {
	onClick?: () => void | Promise<void>
	children?: ReactNode
	mode?: SubmitButtonModes
	successMessage?: string
	failedMessage?: string
}

export const SubmitButton = ({
	onClick,
	children,
	mode = 'timed',
	successMessage,
	failedMessage,
	...rest
}: SubmitButtonProps) => {
	const [status, setStatus] = useState<SubmitButtonStatuses>(null)
	const [submitting, setSubmitting] = useState<boolean>(false)

	const color = status === 'success' ? 'success' : status === 'failed' ? 'error' : 'primary'

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		let isSuccess = false

		setSubmitting(true)

		try {
			await onClick?.(e)
			setStatus('success')
			isSuccess = true
		} catch {
			setStatus('failed')
		} finally {
			setSubmitting(false)

			if (mode === 'timed' || !isSuccess) {
				setTimeout(() => setStatus(null), timeoutDelay)
			}
		}
	}

	return (
		<Button
			variant={rest.variant}
			fullWidth
			size="small"
			color={color}
			disabled={submitting || rest.disabled || !!status}
			loading={submitting}
			onClick={handleSubmit}
			{...rest}
		>
			{!status ? (
				children
			) : (
				<SubmitStatus status={status} failedMessage={failedMessage} successMessage={successMessage} />
			)}
		</Button>
	)
}
