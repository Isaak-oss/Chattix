import { type User, useMe } from '@entities/user'
import { updateMe } from '@entities/user/api/userApi.ts'
import { type ProfileFormShema, profileFormShema } from '@features/settings/model/ProfileFormShema.ts'
import { SettingSection } from '@features/settings/ui/SettingSection.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import { Box, Button, Stack, Typography } from '@mui/material'
import type { ApiResponse } from '@shared/api'
import { USER_QUERY_KEY } from '@shared/config'
import { setFormErrors } from '@shared/lib'
import { DefaultTextField, SubmitButton } from '@shared/ui'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'

export const ProfileSettings = () => {
	const queryClient = useQueryClient()
	const { data: me } = useMe()

	const {
		control,
		formState: { isValid },
		getValues,
		setError,
		reset
	} = useForm<ProfileFormShema>({
		resolver: zodResolver(profileFormShema),
		defaultValues: profileFormShema.parse(me?.data)
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
		<SettingSection title="Profile" description="Manage your personal information" Icon={PermIdentityOutlinedIcon}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
				<Controller
					control={control}
					name={'avatar'}
					render={() => (
						<Box sx={{ position: 'relative' }}>
							<UserAvatar variant={'large'} userName={me!.data?.username} />
							<Box
								sx={{
									position: 'absolute',
									bottom: 1,
									right: 1,
									width: 30,
									height: 30,
									borderRadius: 1,
									bgcolor: 'primary.main',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
									border: '2px solid',
									borderColor: 'background.paper'
								}}
							>
								<CameraAltOutlinedIcon fontSize="small" sx={{ color: 'background.default', width: 15, height: 15 }} />
							</Box>
						</Box>
					)}
				/>

				<Box>
					<Typography variant="subtitle2">Profile Photo</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						JPG, GIF or PNG. Max size 2MB.
					</Typography>
				</Box>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Stack sx={{ gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
					<DefaultTextField
						control={control}
						name={'fullName'}
						label={'Full Name'}
						textFieldProps={{ size: 'small', fullWidth: true }}
					/>
					<DefaultTextField
						control={control}
						name={'username'}
						label={'Username'}
						textFieldProps={{ size: 'small', fullWidth: true }}
					/>
				</Stack>
				<DefaultTextField control={control} name={'bio'} label={'Bio'} textFieldProps={{ size: 'small' }} />
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
