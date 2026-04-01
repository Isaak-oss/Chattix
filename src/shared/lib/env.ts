import { ZodError, z } from 'zod'

/**
 * ✅ DX Best practice (Type safe env variables)
 * Validate env variables with zod
 */
const envVariablesSchema = z.object({
	VITE_API_BASE_URL: z.url(),
	VITE_API_MODE: z.enum(['mock', 'real']),
	VITE_API_TOKEN_KEY: z.string()
})

let env: z.infer<typeof envVariablesSchema>

try {
	env = envVariablesSchema.parse(import.meta.env)
} catch (err) {
	console.error('Env vars is invalid, check schema in the "@/shared/lib/env.ts"')

	if (err instanceof ZodError) {
		console.error(err)
	}

	throw err
}

export { env }
