export interface PledgeData {
  pledgeId: number;
  programName: string;
  pledgeFundType: string;
  amount: number;
  installments: number;
  paymentPeriod: number;
  startDate: Date;
  endDate: Date;
  country:string;
  status:string;
}