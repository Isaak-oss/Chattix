type Page = {
	meta?: {
		limit?: number
		offset?: number
		hasMore?: boolean
	}
}

export const getNextPageParam = (lastPage: Page) => {
	const meta = lastPage.meta

	if (!meta?.limit || meta.hasMore === false || meta.offset === undefined) {
		return undefined
	}

	return meta.offset + meta.limit
}
