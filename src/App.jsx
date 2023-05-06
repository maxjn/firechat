import { useContext } from "react";

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
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
