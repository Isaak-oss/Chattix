import type { User } from '@entities/user'
import type { BaseEntity } from '@globalTypes/base.ts'

export type Post = BaseEntity & {
	content: string
	isPublished: string
	author: User
}

export type PostBody = {
	content: string
}
