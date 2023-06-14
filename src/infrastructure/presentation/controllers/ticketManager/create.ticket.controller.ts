import { Response, Request } from "express";
import { CreateTickeService } from "../../../../application/ticketManager/create.ticke.service";
import { CustomError } from "../../../../domain/errors/CustomError";

/**
 * Clase CreateTicket que maneja la creación de un nuevo ticket.
 */
export class CreateTicket {
    constructor(private readonly createTicketService: CreateTickeService) { }

    /**
     * Método create para crear un nuevo ticket.
     * @param req - Objeto de tipo Request que representa la solicitud HTTP.
     * @param res - Objeto de tipo Response que representa la respuesta HTTP.
     * @returns Una promesa que resuelve a void.
     */
    async create(req: Request, res: Response): Promise<void> {
        try {
            this.createTicketService.createTicket(req.body);
            this.sendSuccessResponse(res, 'Ticket created successfully');
        } catch (err) {
            console.log(err);
            if (err instanceof CustomError) {
                this.sendErrorResponse(res, err.statusCode, err.message);
            } else {
                this.sendErrorResponse(res, 500, "Internal server error");
            }
        }
    }

    /**
     * Método privado para enviar una respuesta exitosa.
     * @param res - Objeto de tipo Response que representa la respuesta HTTP.
     * @param message - Mensaje de éxito a enviar en la respuesta.
     * @returns El objeto Response enviado.
     */
    private sendSuccessResponse(res: Response, message: string): Response {
        return res.status(200).json({ message: message });
    }

    /**
     * Método privado para enviar una respuesta de error.
     * @param res - Objeto de tipo Response que representa la respuesta HTTP.
     * @param statusCode - Código de estado de la respuesta de error.
     * @param message - Mensaje de error a enviar en la respuesta.
     * @returns El objeto Response enviado.
     */
    private sendErrorResponse(res: Response, statusCode: number, message: string): Response {
        return res.status(statusCode).json({ message: message });
    }
}
