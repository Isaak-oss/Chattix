type RouteConfig<TParams extends Record<string, string> | undefined = undefined> = {
	path: string
	build: TParams extends undefined ? () => string : (params: TParams) => string
}

export const createRoute = <TParams extends Record<string, string> | undefined = undefined>(
	path: string
): RouteConfig<TParams> => {
	return {
		path,
		build: ((params?: Record<string, string>) => {
			if (!params) return path

			let result = path

			Object.entries(params).forEach(([key, value]) => {
				result = result.replace(`:${key}`, value)
			})

			return result
		}) as RouteConfig<TParams>['build']
	}
}
