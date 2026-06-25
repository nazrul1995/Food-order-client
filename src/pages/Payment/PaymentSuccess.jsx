import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  CheckCircle,
  Package,
  CreditCard
} from "lucide-react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";


const PaymentSuccess = () => {

  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState(null);


  const {
    mutate,
    isPending,
    isError
  } = useMutation({

    mutationFn: async () => {

      const res = await axiosSecure.patch(
        `/payment-success?session_id=${sessionId}`
      );

      return res.data;

    },


    onSuccess: (data) => {

      setPaymentInfo({

        transactionId:
          data.transactionId,

        trackingId:
          data.trackingId,

        amount:
          data.amount,

        email:
          data.email

      });

    }

  });



  useEffect(() => {

    if(sessionId){
      mutate();
    }

  },[sessionId, mutate]);



  if(isPending){
    return <LoadingSpinner/>
  }



  if(isError){

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

        <div className="text-center">

          <h2 className="text-3xl text-red-400 font-bold">
            Payment Verification Failed
          </h2>

          <p className="mt-3 text-slate-400">
            Something went wrong while confirming your payment.
          </p>

        </div>

      </div>

    )

  }



  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-5">


      <div className="bg-slate-800 max-w-lg w-full rounded-3xl shadow-2xl p-10 text-center text-white">


        <CheckCircle
          size={90}
          className="mx-auto text-lime-400 mb-6"
        />


        <h1 className="text-4xl font-bold mb-3">
          Payment Successful 🎉
        </h1>


        <p className="text-slate-400 mb-8">
          Thank you for your order.
          Your food preparation has started.
        </p>



        <div className="space-y-4 text-left">


          <div className="bg-slate-900 rounded-xl p-4 flex gap-3">

            <CreditCard
              className="text-lime-400"
            />

            <div>

              <p className="text-sm text-slate-400">
                Transaction ID
              </p>

              <p className="font-semibold break-all">
                {paymentInfo?.transactionId}
              </p>

            </div>

          </div>



          <div className="bg-slate-900 rounded-xl p-4 flex gap-3">


            <Package
              className="text-lime-400"
            />


            <div>

              <p className="text-sm text-slate-400">
                Order Tracking ID
              </p>


              <p className="font-semibold">
                {paymentInfo?.trackingId}
              </p>


            </div>


          </div>


          {paymentInfo?.amount && (

            <div className="bg-slate-900 rounded-xl p-4">

              <p className="text-sm text-slate-400">
                Paid Amount
              </p>

              <p className="font-bold text-xl text-lime-400">
                ${paymentInfo.amount}
              </p>

            </div>
          )}
        </div>
        <Link
          to="/dashboard/my-orders"
          className="inline-block mt-8 px-8 py-3 rounded-xl bg-lime-500 text-black font-bold hover:bg-lime-400 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>

  );

};


export default PaymentSuccess;