import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
export declare class AppController {
    private readonly ticketRepository;
    constructor(ticketRepository: Repository<Ticket>);
    getAllTickets(): Promise<Ticket[]>;
    generateTicket(): Promise<{
        placeNumber: number;
        availablePlaces: number[];
    }>;
    releaseTicket(placeNumber: number): Promise<{
        availablePlaces: number[];
    }>;
    resetParkingApp(): Promise<string>;
    private getAvailablePlace;
    private getAvailablePlaces;
}
