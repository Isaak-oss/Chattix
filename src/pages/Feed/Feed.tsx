import {Button} from "@mui/material";
import {useAuthStore} from "@entities/auth";

export const Feed = () => {
	const logout = useAuthStore(s => s.logout)

	return <div>
		<Button onClick={logout}>logout</Button>
	</div>
}
