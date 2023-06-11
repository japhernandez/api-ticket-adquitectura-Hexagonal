import { autoInjectable } from "tsyringe"
import { Request, Response } from 'express';
import { LoginService } from '../../../../application/auth/login.services';
import { CustomError } from '../../../../domain/errors/CustomError';
/**
 * Controlador para manejar la solicitud de inicio de sesión.
 */
@autoInjectable()
export class LoginController {
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
            const { user, token } = await this.loginService.login(email, password);

            // Enviar una respuesta exitosa con el usuario y el token de JWT
            this.sendSuccessResponse(res, 'Login successful', { user, token });
        } catch (err) {
            console.error(err);
            if (err instanceof CustomError) {
                this.sendErrorResponse(res, err.statusCode, err.message);
            } else {
                this.sendErrorResponse(res, 500, "failed to login");
            }
        }
    }

    /**
     * Enviar una respuesta exitosa.
     * @param res - Objeto de respuesta de Express.
     * @param message - Mensaje de éxito.
     * @param data - Datos opcionales para incluir en la respuesta.
     */
    private sendSuccessResponse(res: Response, message: string, data?: any): void {
        res.status(200).json({ message, data });
    }

    /**
     * Enviar una respuesta de error.
     * @param res - Objeto de respuesta de Express.
     * @param statusCode - Código de estado de HTTP para la respuesta.
     * @param message - Mensaje de error.
     */
    private sendErrorResponse(res: Response, statusCode: number, message: string): void {
        res.status(statusCode).json({ message });
    }
}
