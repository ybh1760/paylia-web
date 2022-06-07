import { GetServerSideProps } from "next";

import { OrderService } from "@/services";

export default function OrderFailPage() {
  return (
    <div>
      <main>
        <h1>결제실패</h1>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  query,
}) => {
  const result = await OrderService.fail(
    params.merchantUid as string,
    { reason: query.message as string },
    req.cookies.accessToken
  );

  return {
    props: { result },
  };
};
