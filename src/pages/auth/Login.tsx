import { useState } from "react";
import { useNavigate } from "react-router";
import { VscError } from "react-icons/vsc";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const Submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetch(import.meta.env.VITE_APP_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        login: e.target.login.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setLoading(false);
          localStorage.setItem("auth", data.result.access_token);
          navigate("/" + data.result.role);
        } else {
          setError(data?.detail);
          setLoading(false);
        }
      });
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <form className="flex flex-col gap-5 w-[300px]" onSubmit={Submit}>
        {error && (
          <div className="w-full rounded-md bg-red-100 h-10 flex items-center justify-center gap-2">
            <VscError color="red" />
            <p>{error}</p>
          </div>
        )}
        <input
          type="text"
          className="border-2 rounded-md p-2"
          placeholder="Login"
          required
          name="login"
          minLength={4}
        />
        <input
          required
          minLength={4}
          type="password"
          name="password"
          placeholder="Password"
          className="border-2 rounded-md p-2"
        />
        <button
          disabled={loading}
          className="mt-5 h-10 bg-slate-600 text-gray-100 rounded-md disabled:bg-slate-400 flex justify-center items-center"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
};

export default Login;
