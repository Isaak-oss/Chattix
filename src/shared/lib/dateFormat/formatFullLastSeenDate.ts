import { formatTime } from './formatTime.ts'

const MS_IN_MINUTE = 60 * 1000
const MS_IN_HOUR = 60 * MS_IN_MINUTE

const getPlural = (value: number, forms: [string, string, string]) => {
	const lastDigit = value % 10
	const lastTwoDigits = value % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return forms[2]
	if (lastDigit === 1) return forms[0]
	if (lastDigit >= 2 && lastDigit <= 4) return forms[1]

	return forms[2]
}

const getStartOfDay = (date: Date) => {
	const startOfDay = new Date(date)

	startOfDay.setHours(0, 0, 0, 0)

	return startOfDay
}

const isSameDay = (date: Date, now: Date) => getStartOfDay(date).getTime() === getStartOfDay(now).getTime()

const isYesterday = (date: Date, now: Date) => {
	const yesterday = getStartOfDay(now)

	yesterday.setDate(yesterday.getDate() - 1)

	return getStartOfDay(date).getTime() === yesterday.getTime()
}

export const formatFullLastSeenDate = (date?: string | Date) => {
	if (!date) return ''

	const parsedDate = new Date(date)

	if (Number.isNaN(parsedDate.getTime())) return ''

	const now = new Date()
	const diff = Math.max(0, now.getTime() - parsedDate.getTime())

	if (diff < MS_IN_MINUTE) return 'just now'

	if (diff < MS_IN_HOUR) {
		const minutes = Math.max(1, Math.floor(diff / MS_IN_MINUTE))

		return `${minutes} ${getPlural(minutes, ['minute', 'minutes', 'minutes'])} ago`
	}

	if (isSameDay(parsedDate, now)) {
		const hours = Math.max(1, Math.floor(diff / MS_IN_HOUR))

		return `${hours} ${getPlural(hours, ['hour', 'hours', 'hours'])} ago`
	}

	if (isYesterday(parsedDate, now)) return `yesterday at ${formatTime(parsedDate)}`

	return parsedDate.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}
