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
		const container = containerRef.current

		if (!container) return

		const updateWidth = () => {
			setContainerWidth(container.offsetWidth)
		}

		updateWidth()
		const resizeObserver = new ResizeObserver(updateWidth)
		resizeObserver.observe(container)

		return () => {
			resizeObserver.disconnect()
		}
	}, [hasData])

	const lanes = isGrid ? Math.max(1, Math.floor(containerWidth / minItemWidth)) : 1

	// auto item width
	const itemWidthInPercent = 100 / lanes

	return { itemWidthInPercent, lanes, containerRef }
}
