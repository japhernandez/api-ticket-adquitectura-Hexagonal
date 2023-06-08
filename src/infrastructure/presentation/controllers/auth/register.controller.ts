import { Response, Request } from "express";
import { RegisterService } from "@/application/auth/register.services";

/**
 * Controlador para el registro de usuarios.
 */
export class RegisterController {
    constructor(private registerService: RegisterService) { }

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
            this.sendErrorResponse(res, 500, "Error while registering");
        }
    }

    /**
     * Envía una respuesta exitosa al cliente.
     * @param res - Objeto de respuesta de Express.
     * @param message - Mensaje de éxito.
     */
    private sendSuccessResponse(res: Response, message: string): void {
        res.status(200).json({ message });
    }

    /**
     * Envía una respuesta de error al cliente.
     * @param res - Objeto de respuesta de Express.
     * @param statusCode - Código de estado HTTP del error.
     * @param message - Mensaje de error.
     */
    private sendErrorResponse(res: Response, statusCode: number, message: string): void {
        res.status(statusCode).json({ Error: message });
    }
}
