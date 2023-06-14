import { Router } from "express";
import { createTicket } from "../../../dependencies/tockeManager/ticketManager.dependencies";
import VerifyToken from "../../../middlewares/verifyToken";
const TicketManagetRoutes = Router();

TicketManagetRoutes
    .post("/createTicket", createTicket.create)

export default TicketManagetRoutes;  