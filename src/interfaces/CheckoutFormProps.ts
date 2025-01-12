export interface CheckoutFormProps {
    paymentId: string;
    reservationId: string;
    userId: string;
    userEmail: string;
    amount: number;
    numOfTickets: number;
    perTicketCharge: number;
    paymentDate: string;
    paymentTime: string;
    refundStatus: string;
    checkAccept: boolean;
  }