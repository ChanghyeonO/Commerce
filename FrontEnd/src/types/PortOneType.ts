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
  id: string;
  amount: number;
  buyer_addr: string;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  delivery_request: string;
  imp_uid: string;
  name: string;
  order_status: string;
  user_id: string;
}
