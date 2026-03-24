export function clone<T>(value: T): T {
	if (value === null || typeof value !== 'object') {
		return value
	}

	if (value instanceof Date) {
		return new Date(value.getTime()) as any
	}

	if (Array.isArray(value)) {
		return value.map(clone) as any
	}

	const result: any = {}
	for (const key in value) {
		if (Object.prototype.hasOwnProperty.call(value, key)) {
			result[key] = clone((value as any)[key])
		}
	}

	return result
}
