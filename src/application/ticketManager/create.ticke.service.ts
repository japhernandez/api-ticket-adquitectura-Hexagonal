import { Ticket } from "../../domain/ticketManager/Ticket";
import { CustomError } from "../../domain/errors/CustomError";
import { SequelizeTicketRepository } from "../../infrastructure/database/sequelizer/repositories/SeuquelizeTickerepository";

/**
 * Clase CreateTicket para crear un nuevo ticket.
 */
export class CreateTickeService {
    constructor(private readonly TicketRepository: SequelizeTicketRepository) { };

    /**
    * Método createTicket para crear un nuevo ticket.
    * @param ticket - Objeto de tipo Ticket que representa el ticket a crear.
    * @throws CustomError si el ticket es inválido o si ocurre un error al crear el ticket.
    */

    async createTicket(tikect: Ticket): Promise<void> {
        this.validateTicket(tikect);
        try {
            await this.TicketRepository.create(tikect)
        } catch (err) {
            console.log(err);
            throw new CustomError(500, "error create ticket");

        }
    }

    /**
      * Método privado para validar un ticket.
      * @param ticket - Objeto de tipo Ticket que representa el ticket a validar.
      * @throws CustomError si el ticket es inválido.
      */
    private validateTicket(ticket: Ticket): void {
        const { userId, title, description, status } = ticket;
        if (!userId || !title || !description || !status) {
            throw new CustomError(409, "Invalid ticket");
        }
    }
}