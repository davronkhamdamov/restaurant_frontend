import OrdersTable from "../components/MeatTable";

const MeatsToOrder = () => {
  return (
    <div className="p-10 w-full">
      <div className="shadow-md shadow-slate-100 h-24 flex items-center rounded-3xl pl-10">
        <h1 className="text-4xl font-semibold">Orders</h1>
      </div>
      <OrdersTable />
    </div>
  );
};

export default MeatsToOrder;
