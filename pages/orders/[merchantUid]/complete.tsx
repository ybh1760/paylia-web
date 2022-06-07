import type { GetServerSideProps } from "next";

import { PaymentService } from "@/services";

export default function OrderCompletePage() {
  return (
    <div>
      <main>
        <h1>결제완료</h1>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  query,
}) => {
  const result = await PaymentService.complete(
    {
      merchantUid: params.merchantUid as string,
      paymentKey: query.paymentKey as string,
      amount: Number(query.amount),
    },
    req.cookies.accessToken
  );

  return {
    props: { result },
  };
};
