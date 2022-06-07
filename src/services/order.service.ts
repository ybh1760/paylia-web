import { Order, PayMethod } from "@/models";

import { api } from "./base.service";

class OrderService {
  async create(input: { itemId: number }): Promise<Order> {
    return await api.post<Order>(`/orders`, input);
  }

  async start(
    merchantUid: string,
    input: { payMethod: PayMethod }
  ): Promise<Order> {
    return await api.post<Order>(`/orders/${merchantUid}/start`, input);
  }

  async fail(
    merchantUid: string,
    input: { reason: string },
    token?: string
  ): Promise<Order> {
    return await api.post<Order>(`/orders/${merchantUid}/fail`, input, token);
  }

  async get(merchantUid: string, token?: string): Promise<Order> {
    return await api.get<Order>(`/orders/${merchantUid}`, token);
  }
}

export default new OrderService();
