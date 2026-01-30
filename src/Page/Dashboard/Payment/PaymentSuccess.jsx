import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!sessionId || calledRef.current) return;
    calledRef.current = true;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        setPaymentInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>

        <p className="text-accent mb-6">
          Thank you for your order. Your payment has been completed
          successfully.
        </p>

        {paymentInfo?.transactionId && (
          <div className="bg-base-200 rounded-lg p-4 mb-6 text-sm">
            <p className="font-medium">Transaction ID</p>
            <p className="text-primary break-all">
              {paymentInfo.transactionId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard/freelancer/orders" className="btn btn-primary">
            Applications
          </Link>

          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
