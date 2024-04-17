import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
