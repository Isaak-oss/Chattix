import { Box } from '@mui/material'
import { type ReactNode, type RefObject, createContext, useContext, useRef } from 'react'

type ScrollContextValue = RefObject<HTMLDivElement | null>

const ScrollContext = createContext<ScrollContextValue | null>(null)

type ScrollProviderProps = {
	children: ReactNode
	maxHeight?: string | number
}

export const ScrollProvider = ({ children, maxHeight = '100%' }: ScrollProviderProps) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	return (
		<ScrollContext.Provider value={scrollRef}>
			<Box ref={scrollRef} style={{ overflow: 'auto', maxHeight: maxHeight, flex: 1 }}>
				{children}
			</Box>
		</ScrollContext.Provider>
	)
}

export const useScrollRef = (): RefObject<HTMLDivElement | null> => {
	const context = useContext(ScrollContext)

	if (!context) {
		throw new Error('useScrollRef must be used within ScrollProvider')
	}

	return context
}
