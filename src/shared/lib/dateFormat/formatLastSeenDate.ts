import { formatTime } from './formatTime.ts'

const MS_IN_DAY = 24 * 60 * 60 * 1000

const getStartOfWeek = (date: Date) => {
	const startOfWeek = new Date(date)
	const day = startOfWeek.getDay()
	const diff = day === 0 ? -6 : 1 - day

	startOfWeek.setDate(startOfWeek.getDate() + diff)
	startOfWeek.setHours(0, 0, 0, 0)

	return startOfWeek
}

const isDateInCurrentWeek = (date: Date, now: Date) => {
	const startOfWeek = getStartOfWeek(now)
	const startOfNextWeek = new Date(startOfWeek)

	startOfNextWeek.setDate(startOfNextWeek.getDate() + 7)

	return date >= startOfWeek && date < startOfNextWeek
}

export const formatLastSeenDate = (date?: string | Date) => {
	if (!date) return ''

	const parsedDate = new Date(date)

	if (Number.isNaN(parsedDate.getTime())) return ''

	const now = new Date()
	const diff = now.getTime() - parsedDate.getTime()

	if (diff < MS_IN_DAY) return formatTime(parsedDate)

	if (isDateInCurrentWeek(parsedDate, now)) {
		return parsedDate.toLocaleDateString('ru-RU', {
			weekday: 'long'
		})
	}

	return parsedDate.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}
