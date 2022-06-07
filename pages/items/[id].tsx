import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { AuthService, ItemService, OrderService } from "@/services";
import { Item, PayMethod, PAY_METHOD_KOR } from "@/models";

import { useRouter } from "next/router";

type ItemDetailPageProps = {
  item: Item;
};

export default function ItemDetailPage({ item }: ItemDetailPageProps) {
  const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.Card);

  const router = useRouter();

  useEffect(() => {
    signIn();
  }, []);

  const signIn = async () => {
    await AuthService.signIn();
  };

  const purchase = async () => {
    const order = await OrderService.create({
      itemId: item.id,
    });
    router.push(`/orders/${order.merchantUid}`);
  };

  if (!item) {
    return <></>;
  }

  return (
    <div>
      <main>
        <h1>Paylia</h1>
        <p>상품명: {item.name}</p>
        <p>가격: {item.price}</p>
        <button onClick={purchase}>구매하기</button>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params;
  const item = await ItemService.get(Number(id));
  return {
    props: { item },
  };
};
