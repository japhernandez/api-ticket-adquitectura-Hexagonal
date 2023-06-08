export class Ticket {
    constructor(
      readonly id: string,
      readonly userId: string,
      readonly title: string,
      readonly description: string,
      readonly status: string
    ) {}
  }