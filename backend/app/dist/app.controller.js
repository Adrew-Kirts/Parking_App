"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
let AppController = exports.AppController = class AppController {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    async getAllTickets() {
        const tickets = await this.ticketRepository.find();
        return tickets;
    }
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
    async releaseTicket(placeNumber) {
        const ticket = await this.ticketRepository.findOne({ where: { placeNumber } });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with placeNumber ${placeNumber} not found.`);
        }
        await this.ticketRepository.remove(ticket);
        const tickets = await this.ticketRepository.find();
        const availablePlaces = tickets.map((t) => t.placeNumber);
        return { availablePlaces };
    }
    async resetParkingApp() {
        await this.ticketRepository.clear();
        return 'Parking app has been reset';
    }
    getAvailablePlace(tickets) {
        const allPlaces = Array.from({ length: 20 }, (_, i) => i + 1);
        const occupiedPlaces = tickets.map((ticket) => ticket.placeNumber);
        const availablePlaces = allPlaces.filter((place) => !occupiedPlaces.includes(place));
        return availablePlaces.length > 0 ? availablePlaces[0] : null;
    }
    getAvailablePlaces(tickets) {
        const allPlaces = Array.from({ length: 20 }, (_, i) => i + 1);
        const occupiedPlaces = tickets.map((ticket) => ticket.placeNumber);
        const availablePlaces = allPlaces.filter((place) => !occupiedPlaces.includes(place));
        return availablePlaces;
    }
};
__decorate([
    (0, common_1.Get)('tickets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllTickets", null);
__decorate([
    (0, common_1.Post)('ticket'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generateTicket", null);
__decorate([
    (0, common_1.Delete)('tickets/:placeNumber'),
    __param(0, (0, common_1.Param)('placeNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "releaseTicket", null);
__decorate([
    (0, common_1.Delete)('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "resetParkingApp", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppController);
//# sourceMappingURL=app.controller.js.map