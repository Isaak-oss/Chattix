import { initSession } from '@app/init/session.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

initSession()
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
