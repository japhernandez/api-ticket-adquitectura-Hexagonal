import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";

/**
 * Middleware para verificar y decodificar un token de acceso.
 * Agrega el ID de usuario extraído del token decodificado a req.params.userId.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @param next - Función de llamada siguiente.
 */

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header('Access-Token');

    if (!accessToken) {
        return res.status(401).json({ error: 'Invalid access_token' });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('Failed to generate token. JWT_SECRET is missing.');
        }

        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET) as { userId: string };
        req.params.userId = decodedToken.userId;

        next();
    } catch (error) {
        if (error) {
            return res.status(401).json({ error: 'Invalid access_token' });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default VerifyToken