import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyRight from "../components/CopyRight";
function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        theme="light"
      />
      <CopyRight />
    </>
  );
}

export default RootLayout;
