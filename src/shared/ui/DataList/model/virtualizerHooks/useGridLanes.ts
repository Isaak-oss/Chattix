import { useEffect, useRef, useState } from 'react'

type useGridLanesProps = {
	hasData: boolean
	isGrid: boolean
	minItemWidth: number
}

// this hook used for calculate "lanes" by container width and get itemWidthInPercent for "left" style
export const useGridLanes = ({ hasData, isGrid, minItemWidth }: useGridLanesProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [containerWidth, setContainerWidth] = useState(0)

	useEffect(() => {
		if (!containerRef.current) return
		const updateWidth = () => {
			setContainerWidth(containerRef.current!.offsetWidth)
		}
		updateWidth()
		const resizeObserver = new ResizeObserver(updateWidth)
		resizeObserver.observe(containerRef.current)
		return () => {
			resizeObserver.disconnect()
		}
	}, [containerRef, hasData])

	const lanes = isGrid ? Math.max(1, Math.floor(containerWidth / minItemWidth)) : 1

	// auto item width
	const itemWidthInPercent = 100 / lanes

	return { itemWidthInPercent, lanes, containerRef }
}
