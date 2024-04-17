import OrderStatusTable from "../components/OrderStatusTable";

const OrdersStatus = () => {
  return (
    <div className="p-10 w-full">
      <div className="shadow-md shadow-slate-100 h-24 flex items-center rounded-3xl pl-10">
        <h1 className="text-4xl font-semibold">Orders</h1>
      </div>
      <OrderStatusTable />
    </div>
  );
};

export default OrdersStatus;
