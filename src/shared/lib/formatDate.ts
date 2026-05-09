export const formatDate = (date?: string) => {
	if (!date) return ''

	const newDate = new Date(date)

	if (!newDate) return date

	return newDate.toDateString()
}
