export enum PaymentFrequency {
  YEARLY = 'YEARLY',
  HALFYEARLY = 'HALFYEARLY',
  QUARTERLY = 'QUARTERLY',
  MONTHLY = 'MONTHLY',
}

export interface Product {
  productId: string;
  productTypeCd: string;
  productFamilyCd: string;
  baseSumAssured: number;
  baseAnnualPremium: number;
  productTerm: number;
  premiumPayingTerm: number;
  paymentFrequencyCd: PaymentFrequency;
  planCode: string;
  selected?: boolean;
}
