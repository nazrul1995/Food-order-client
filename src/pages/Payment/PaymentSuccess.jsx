import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  useEffect(() => {
    if (!orderId) return;

    let tries = 0;
    const poll = setInterval(async () => {
      tries++;
      const { data } = await axiosSecure.get(`/orders/${orderId}/status`);
      if (data.paymentStatus === "paid" || tries > 10) {
        clearInterval(poll);
        navigate("/dashboard/my-orders");
      }
    }, 1500);

    return () => clearInterval(poll);
  }, [orderId]);

  return (
    <div>
      <h1>Confirming your payment…</h1>
      <p>This usually takes a few seconds.</p>
    </div>
  );
};

export default PaymentSuccess;