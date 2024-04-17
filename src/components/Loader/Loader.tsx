import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-dvh flex justify-center items-center">
      <Oval
        visible={true}
        height="50"
        width="50"
        strokeWidth="5"
        color="#4fa94d"
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default Loader;
