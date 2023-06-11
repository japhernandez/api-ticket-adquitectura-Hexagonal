import { Request, Response } from 'express';
import { LoginService } from '@/application/auth/login.services';
import { CustomError } from '@/domain/errors/CustomError';
import { User } from '@/domain/User/User';

/**
 * Controlador para manejar la solicitud de inicio de sesión.
 */
export class LoginController {
    /**
     * Crea una instancia del controlador LoginController.
     * @param loginService - Servicio de inicio de sesión.
     */
    constructor(private loginService: LoginService) { }

    /**
     * Realiza el inicio de sesión de un usuario.
     * @param req - Objeto de solicitud de Express.
     * @param res - Objeto de respuesta de Express.
     * @returns Una respuesta JSON que contiene el resultado del inicio de sesión.
     */
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Realizar el inicio de sesión utilizando el servicio de autenticación
            const { user, accessToken, refreshToken } = await this.loginService.login(email, password);

            // Enviar una respuesta exitosa con el usuario y los tokens
            this.sendSuccessResponse(res, 'Login successful', { user, accessToken, refreshToken });
        } catch (err) {
            console.error(err);
            if (err instanceof CustomError) {
                this.sendErrorResponse(res, err.statusCode, err.message);
            } else {
                this.sendErrorResponse(res, 500, 'Failed to login');
            }
        }
    }

    /**
     * Envía una respuesta exitosa al cliente.
     * @param res - Objeto de respuesta de Express.
     * @param message - Mensaje de éxito.
     * @param data - Datos adicionales a enviar en la respuesta.
     */
    private sendSuccessResponse(res: Response, message: string, data?: any): void {
        res.status(200).json({ message, data });
    }

    /**
     * Envía una respuesta de error al cliente.
     * @param res - Objeto de respuesta de Express.
     * @param statusCode - Código de estado HTTP del error.
     * @param message - Mensaje de error.
     */
    private sendErrorResponse(res: Response, statusCode: number, message: string): void {
        res.status(statusCode).json({ error: message });
    }
}
