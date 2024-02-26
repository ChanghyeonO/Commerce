declare global {
  interface Window {
    IMP: any; // IMP 타입 정의
  }
}

export interface PaymentDetails {
  imp_uid: string;
  merchant_uid: string;
}

interface PaymentFailureDetails {
  status: string;
  fail_reason?: string;
}

export interface APIPaymentResponse {
  code: number;
  message: string | null;
  response: PaymentFailureDetails;
}
