
import { Request, Response, NextFunction } from 'express'
import { Schema, z, ZodError } from 'zod'


type ZodSchema<T> = Schema<T>

export const validateSchema = <T>(schema: ZodSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ msg: 'Erro de validação', errors: error.errors })
            }
            return res.status(500).json({ msg: 'Erro interno do servidor' })
        }
    }
}