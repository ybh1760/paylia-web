import { Item } from "@/models";

import { api } from "./base.service";

class ItemService {
  async get(id: number): Promise<Item> {
    return await api.get<Item>(`/items/${id}`);
  }
}

export default new ItemService();
