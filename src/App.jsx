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
import RootLayout from "./layouts/RootLayout";
import AuthProtectedRoute from "./utils/AuthProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
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
          <AuthProtectedRoute>
            <Register />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="login"
        element={
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
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
    </main>
  );
}

export default App;
