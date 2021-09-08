export interface GetProductParams {
  genderCd: string;
  dob: string;
  planCode: string;
  paymentFrequency?: "YEARLY" | "HALFYEARLY" | "QUARTERLY" | "MONTHLY";
  premiumPerYear?: number;
  saPerYear?: number;
}
