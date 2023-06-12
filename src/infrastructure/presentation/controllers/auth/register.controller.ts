import { Response, Request } from "express";
import { RegisterService } from "../../../../application/auth/register.services";
import { CustomError } from '../../../../domain/errors/CustomError';

/**
 * Controlador para el registro de usuarios.
 */
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    /**
     * Registra un nuevo usuario.
     * @param req - Objeto de solicitud de Express.
     * @param res - Objeto de respuesta de Express.
     * @returns Una promesa que se resuelve cuando se completa el registro.
     */
    async register(req: Request, res: Response): Promise<void> {
        try {
            await this.registerService.register(req.body);
            this.sendSuccessResponse(res, "Successfully registered");
        } catch (err) {
            console.log(err);
            if (err instanceof CustomError) {
                this.sendErrorResponse(res, err.statusCode, err.message);
            } else {
                this.sendErrorResponse(res, 500, "Error while registering");
            }
        }
    }

    /**
     * Envía una respuesta exitosa al cliente.
     * @param res - Objeto de respuesta de Express.
     * @param message - Mensaje de éxito.
     * @returns El objeto de respuesta de Express.
     */
    private sendSuccessResponse(res: Response, message: string): Response {
        return res.status(200).json({ message });
    }

    /**
     * Envía una respuesta de error al cliente.
     * @param res - Objeto de respuesta de Express.
     * @param statusCode - Código de estado HTTP del error.
     * @param message - Mensaje de error.
     * @returns El objeto de respuesta de Express.
     */
    private sendErrorResponse(res: Response, statusCode: number, message: string): Response {
        return res.status(statusCode).json({ Error: message });
    }
}
