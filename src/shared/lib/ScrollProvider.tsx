import { Box, type BoxProps } from '@mui/material'
import { type ReactNode, type RefObject, createContext, useContext, useRef } from 'react'

type ScrollContextValue = RefObject<HTMLDivElement | null>

const ScrollContext = createContext<ScrollContextValue | null>(null)

type ScrollProviderProps = BoxProps & {
	children: ReactNode
	height?: string | number
}

export const ScrollProvider = ({ children, height = '100%', ...rest }: ScrollProviderProps) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	return (
		<ScrollContext.Provider value={scrollRef}>
			<Box
				ref={scrollRef}
				{...rest}
				style={{ overflow: 'auto', height, flex: 1, minHeight: 0, minWidth: 0, ...rest.style }}
			>
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
