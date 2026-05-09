import { useParams } from 'react-router'

export const useProfileId = () => {
	const { profileId = '' } = useParams<{ profileId: Id }>()
	return profileId
}
