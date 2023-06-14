import * as awilix from "awilix";
import { CreateTickeService } from "../../../application/ticketManager/create.ticke.service";
import { CreateTicket } from "../../presentation/controllers/ticketManager/create.ticket.controller";

const container = awilix.createContainer();

container.register({
    CreateTickeService: awilix.asClass(CreateTickeService),
    CreateTicket: awilix.asClass(CreateTicket),
})

export const createTicket = container.resolve("CreateTicket") 