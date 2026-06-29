import { type User, useMe } from '@entities/user'
import { updateMe } from '@entities/user/api/userApi.ts'
import { profileVisibilityOptions, whoCanMessageOptions } from '@features/settings/config/privacySettingOptions.ts'
import { type PrivacyFormSchema, privacyFormSchema } from '@features/settings/model/privacyFormShema.ts'
import { SettingSection } from '@features/settings/ui/SettingSection.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import { Box, Button, MenuItem, Stack } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { USER_QUERY_KEY } from '@shared/config'
import { setFormErrors } from '@shared/lib'
import { DefaultTextField, SubmitButton } from '@shared/ui'
import { useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

export const PrivacySettings = () => {
	const queryClient = useQueryClient()
	const { data: me } = useMe()

	const {
		control,
		formState: { isValid },
		getValues,
		setError,
		reset
	} = useForm<PrivacyFormSchema>({
		resolver: zodResolver(privacyFormSchema),
		defaultValues: privacyFormSchema.parse(me?.data)
	})

	const onSubmit = async () => {
		const data = getValues()
		try {
			const res = await updateMe(data)
			queryClient.setQueriesData<ApiResponse<User>>(
				{ queryKey: [USER_QUERY_KEY] },
				{
					data: res
				}
			)
		} catch (error) {
			console.log(error)
			setFormErrors(setError, error as AxiosError)
		}
	}

	return (
		<SettingSection title="Privacy" description="Control who can see your content" Icon={ShieldOutlinedIcon}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
				<DefaultTextField
					control={control}
					name={'profileVisibility'}
					label="Profile Visibility"
					textFieldProps={{
						select: true,
						size: 'small',
						children: profileVisibilityOptions.map(({ label, value }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))
					}}
				/>
				<DefaultTextField
					control={control}
					name={'whoCanMessage'}
					label="Who Can Message"
					textFieldProps={{
						select: true,
						size: 'small',
						children: whoCanMessageOptions.map(({ label, value }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))
					}}
				/>
			</Box>
			<Stack flexDirection="row" flexWrap="wrap" gap={1} mt={2}>
				<Button variant="outlined" sx={{ flex: 1, p: 0 }} onClick={() => reset()}>
					Reset
				</Button>
				<SubmitButton variant="contained" sx={{ flex: 1 }} onClick={onSubmit} disabled={!isValid}>
					Save
				</SubmitButton>
			</Stack>
		</SettingSection>
	)
}
