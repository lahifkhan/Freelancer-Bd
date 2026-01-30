import React from "react";
import BookOverview from "./BookOverview/BookOverview";
import OrderOverview from "./OrderOverview/OrderOverview";

const statistic = () => {
  return (
    <div className="w-11/12  mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookOverview />
        <OrderOverview />
      </div>
    </div>
  );
};

export default statistic;
