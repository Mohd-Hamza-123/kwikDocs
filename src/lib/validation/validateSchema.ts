import { z, ZodSchema } from 'zod'


const validateSchema = (schema: ZodSchema, data: unknown) => {
    try {
        const validatedData = schema.parse(data)
        return { isValid: true, data: validatedData }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { isValid: false, errors: error?.errors }
        }
        throw error
    }
}

export default validateSchema