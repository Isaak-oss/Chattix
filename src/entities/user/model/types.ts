import type { BaseEntity } from '@globalTypes/base.ts'

export type User = BaseEntity & {
	email: Email
	name: string
	bio?: string
	lastSeen: Date
}
