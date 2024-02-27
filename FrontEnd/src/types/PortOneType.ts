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

export interface OrderDetail {
  name: string;
  buyer_name: string;
  amount: number;
  pay_method: string;
  status: string;
  buyer_addr: string;
  buyer_tel: string;
}
