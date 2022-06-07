import { BaseId } from "./common.model";
import { Item } from "./item.model";
import { User } from "./user.model";

export enum PayMethod {
  Card = "Card",
  Vbank = "Vbank",
}

export const PAY_METHOD_KOR: { [key in PayMethod]: "카드" | "가상계좌" } = {
  [PayMethod.Card]: "카드",
  [PayMethod.Vbank]: "가상계좌",
};

export class Order extends BaseId {
  item: Item;
  itemId: number;

  user: User;
  userId: number;

  merchantUid: string;
  amount: number;
  discountAmount: number;
  paidAmount: number;
  payMethod: PayMethod;

  vbankReadyAt: Date;
  paidAt: Date;
}
