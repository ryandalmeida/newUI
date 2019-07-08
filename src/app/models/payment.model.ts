export interface PaymentData {
    transactionId: number;
    arId: number;
    invoiceId: number;
    pledgeId: number;
    creditAmount: number;
    debitAmount: number;
    balance: number;
    installmentNo: number;
    paymentDate: Date;
    donorName: string;
    country: string;
    pledgeFundType:string;
    }
    