import { api } from "./base.service";

class PaymentService {
  async complete(
    input: {
      paymentKey: string;
      merchantUid: string;
      amount: number;
    },
    token?: string
  ): Promise<boolean> {
    return await api.post<boolean>(`/payments/toss/complete`, input, token);
  }
}

export default new PaymentService();
