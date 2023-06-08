import { Ticket } from './Ticket';

export interface TicketRepository {
    create(ticket: Ticket): Promise<void>;
    update(ticket: Ticket): Promise<void>;
    delete(id: string): Promise<void>;
    findByUser(userId: string): Promise<Ticket[]>;
}