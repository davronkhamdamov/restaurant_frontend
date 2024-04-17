import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-dvh flex-col">
      <Link
        to="auth/login"
        className="flex items-center gap-4 text-white text-xl w-56 h-10 bg-slate-500 p-5 rounded-lg justify-center"
      >
        Login <CiLogin />
      </Link>
    </div>
  );
};

export default Home;
