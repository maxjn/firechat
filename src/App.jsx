import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import NotFound from "./pages/404";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyRight from "./components/CopyRight";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        theme="light"
      />
      <CopyRight />
    </main>
  );
}

export default App;
