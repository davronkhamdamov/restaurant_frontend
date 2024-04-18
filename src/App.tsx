import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
    </>
  );
}

export default App;
