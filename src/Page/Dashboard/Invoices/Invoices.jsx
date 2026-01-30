import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-accent">Invoices</h2>
        <p className="text-gray-500 mt-1">
          All your completed payments are listed here
        </p>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Payment ID</th>
              <th>Book Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>

                <td className="text-xs break-all text-primary">
                  {payment.transactionId}
                </td>

                <td className="font-medium">{payment.bookName || "N/A"}</td>

                <td className="font-semibold text-green-600">
                  ${payment.amount}
                </td>

                <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="text-center py-10 text-gray-500">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default Invoices;
