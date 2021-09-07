export interface GetProductParams {
  name: string;
  genderCd: string;
  dob: string;
  planCode: string;
  paymentFrequency?: 'YEARLY' | 'HALFYEARLY' | 'QUARTERLY' | 'MONTHLY';
  premiumPerYear?: number;
  saPerYear?: number;
}