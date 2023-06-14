import { Ticket } from "../../domain/ticketManager/Ticket";
import { CustomError } from "../../domain/errors/CustomError";
import { SequelizeTicketRepository } from "../../infrastructure/database/sequelizer/repositories/SeuquelizeTickerepository";


/** 
 * Clase GetAllTicket para mostrar los tickets según el ID del usuario.
 */
export class GetAllTicketService {
    constructor(private readonly TicketRepository: SequelizeTicketRepository) { }

    /**
        * Método getAllTicket para obtener los tickets de un usuario.
        * @param userId - ID del usuario.
        * @returns Un objeto que contiene un arreglo de tickets.
        * @throws CustomError si el ID del usuario es inválido o si ocurre un error interno.
        */

    async getAllTicket(userId: string): Promise<{ ticket: Ticket[] }> {
        if (!userId) throw new CustomError(401, "invalid user id");
        try {
            const tickets = await this.TicketRepository.findByUser(userId);
            return { ticket: tickets };
        } catch (err) {
            console.log(err);
            throw new CustomError(500, "internal error:",);
        }
    }
}
