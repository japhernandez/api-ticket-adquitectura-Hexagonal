import { Ticket } from "../../../../domain/ticketManager/Ticket";
import { TicketRepository } from "../../../../domain/ticketManager/TicketRepository";
import { TicketModel } from "../models/Ticket.model";

/**
 * Implementación del repositorio SequelizeTicketRepository que utiliza Sequelize para interactuar con la base de datos.
 * Implementa la interfaz TicketRepository.
 */
export class SequelizeTicketRepository implements TicketRepository {

    /**
     * Crea un nuevo ticket en la base de datos.
     * @param ticket El objeto Ticket que se creará.
     * @returns Promise que se resuelve cuando se crea el ticket.
     */
    async create(ticket: Ticket): Promise<void> {
        const ticketModelData = { ...ticket };
        await TicketModel.create(ticketModelData);
    }

    /**
     * Actualiza un ticket existente en la base de datos.
     * @param ticket El objeto Ticket actualizado.
     * @returns Promise que se resuelve cuando se actualiza el ticket.
     */
    async update(ticket: Ticket): Promise<void> {
        await TicketModel.update(ticket, { where: { id: ticket.id } });
    }

    /**
     * Elimina un ticket de la base de datos por su ID.
     * @param id El ID del ticket a eliminar.
     * @returns Promise que se resuelve cuando se elimina el ticket.
     */
    async delete(id: string): Promise<void> {
        await TicketModel.destroy({ where: { id } });
    }

    /**
     * Busca todos los tickets asociados a un usuario en la base de datos.
     * @param userId El ID del usuario.
     * @returns Promise que se resuelve con un array de tickets encontrados.
     */
    async findByUser(userId: string): Promise<Ticket[]> {
        const tickets = await TicketModel.findAll({ where: { userId } });
        return tickets.map((ticket) => {
            return {
                id: ticket.id,
                userId: ticket.userId,
                title: ticket.title,
                description: ticket.description,
                status: ticket.status
            };
        });
    }
}
