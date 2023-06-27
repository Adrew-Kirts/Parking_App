import { Controller, Get, Post, Delete, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Controller('api')
export class AppController {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  @Get('tickets')
  async getAllTickets() {
    const tickets = await this.ticketRepository.find();
    return tickets;
  }

  @Post('ticket')
  async generateTicket() {
    const tickets = await this.ticketRepository.find();
    const placeNumber = this.getAvailablePlace(tickets);
    if (placeNumber === null) {
      throw new Error('No available places.');
    }

    const ticket = this.ticketRepository.create({ placeNumber });
    await this.ticketRepository.save(ticket);

    return {
      placeNumber,
      availablePlaces: this.getAvailablePlaces(tickets),
    };
  }

  @Delete('tickets/:placeNumber')
  async releaseTicket(@Param('placeNumber') placeNumber: number) {
    const ticket = await this.ticketRepository.findOne({ where: { placeNumber } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with placeNumber ${placeNumber} not found.`);
    }
    await this.ticketRepository.remove(ticket);

    const tickets = await this.ticketRepository.find();
    const availablePlaces = tickets.map((t) => t.placeNumber);
    return { availablePlaces };
  }

  @Delete('reset')
  async resetParkingApp() {
    await this.ticketRepository.clear(); // Clear all ticket entries from the database
    return 'Parking app has been reset';
  }

  private getAvailablePlace(tickets: Ticket[]): number | null {
    const allPlaces = Array.from({ length: 20 }, (_, i) => i + 1);
    const occupiedPlaces = tickets.map((ticket) => ticket.placeNumber);
    const availablePlaces = allPlaces.filter(
      (place) => !occupiedPlaces.includes(place),
    );

    return availablePlaces.length > 0 ? availablePlaces[0] : null;
  }

  private getAvailablePlaces(tickets: Ticket[]): number[] {
    const allPlaces = Array.from({ length: 20 }, (_, i) => i + 1);
    const occupiedPlaces = tickets.map((ticket) => ticket.placeNumber);
    const availablePlaces = allPlaces.filter(
      (place) => !occupiedPlaces.includes(place),
    );

    return availablePlaces;
  }
}
