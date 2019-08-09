
export interface ProcessInvoice{
    pledgeId: number;
    country: string;
    donorName : string;
    invoiceId: number;
    startDate: Date;
    endDate: Date;
    arId: number;
    installmentNo:number;
    debit:number;
}