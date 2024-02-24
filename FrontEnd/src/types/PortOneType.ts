declare global {
  interface Window {
    IMP: any; // IMP 타입 정의
  }
}

// // 결제 데이터 타입 정의
// export interface PaymentData {
//   pg: string;
//   pay_method: string;
//   merchant_uid: string;
//   amount: number;
//   name: string;
//   buyer_name: string;
//   buyer_tel: string;
//   buyer_email: string;
//   buyer_addr: string;
//   buyer_postcode: string;
//   // 추가적으로 필요한 필드가 있다면 여기에 정의
// }

// 결제 완료 콜백 함수의 인자 타입 정의
export interface PaymentResponse {
  imp_uid: string;
  merchant_uid: string;
}
