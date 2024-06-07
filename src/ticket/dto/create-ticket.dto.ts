export class CreateTicketDto {
  eventId: string;
  ticketType: string;
  fullName: string;
  quantity: number;
  price: number;
  salesStartDate: string;
  salesStartTime: string;
  salesEndDate: string;
  salesEndTime: string;
}
