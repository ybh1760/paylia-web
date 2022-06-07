import type { GetServerSideProps } from "next";
import { useState } from "react";

import { OrderService } from "@/services";
import { Order, PayMethod, PAY_METHOD_KOR } from "@/models";
import { useTossPayment } from "@/hooks";

type OrderCheckoutPageProps = {
  order: Order;
};

export default function OrderPage({ order }: OrderCheckoutPageProps) {
  const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.Card);
  const tossPayment = useTossPayment();

  const purchase = async () => {
    await OrderService.start(order.merchantUid, {
      payMethod,
    });

    await tossPayment.requestPayment(PAY_METHOD_KOR[payMethod], {
      amount: order.paidAmount,
      orderId: order.merchantUid,
      orderName: order.item.name,
      customerName: order.user.name,
      successUrl: "http://localhost:3001/orders/complete",
      failUrl: "http://localhost:3001/orders/fail",
    });
  };

  return (
    <div>
      <main>
        <h1>Paylia</h1>
        <p>상품명: {order.item.name}</p>
        <p>상품금액: {order.amount}</p>
        <p>할인금액: {order.discountAmount}</p>
        <p>결제금액: {order.paidAmount}</p>
        <select
          value={payMethod}
          onChange={(e) => {
            setPayMethod(e.target.value as PayMethod);
          }}
        >
          <option value={PayMethod.Card}>카드</option>
          <option value={PayMethod.Vbank}>가상계좌</option>
        </select>
        <button onClick={purchase}>구매하기</button>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { merchantUid } = params;
  const order = await OrderService.get(
    merchantUid as string,
    req.cookies.accessToken
  );

  return {
    props: { order },
  };
};
