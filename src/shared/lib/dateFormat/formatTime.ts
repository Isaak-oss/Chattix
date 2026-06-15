export const formatTime = (date?: string | Date) => {
	if (!date) return ''

	const parsedDate = new Date(date)

	if (Number.isNaN(parsedDate.getTime())) return ''

	return parsedDate.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit'
	})
}
