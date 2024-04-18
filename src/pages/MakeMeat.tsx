import MakerMeatTable from "../components/MakerMeatTable";

const MakeMeat = () => {
  return (
    <div className="p-10 w-full">
      <div className="shadow-md backdrop-blur-sm shadow-slate-100 h-24 flex items-center rounded-3xl px-10 justify-between">
        <h1 className="text-4xl font-semibold">Buyurtmalar</h1>
      </div>
      <MakerMeatTable />
    </div>
  );
};

export default MakeMeat;
