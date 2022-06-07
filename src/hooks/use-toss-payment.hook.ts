import { useEffect, useState } from "react";
import {
  TossPaymentsInstance,
  loadTossPayments,
} from "@tosspayments/payment-sdk";

const CLIENT_KEY = "test_ck_MGjLJoQ1aVZNvJqjl9JVw6KYe2RN";

export const useTossPayment = () => {
  const [tossPayment, setTossPayment] = useState<TossPaymentsInstance>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setTossPayment(await loadTossPayments(CLIENT_KEY));
  };

  return tossPayment;
};
