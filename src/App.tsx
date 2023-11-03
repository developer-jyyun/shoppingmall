import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import Loading from "./components/Loading";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import NotFoundPage from "./pages/NotFoundPage";
import Root from "./components/Root";
import { auth } from "./api/firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContextProvider from "./context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AllProducts from "./components/AllProducts";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, path: "/", element: <MainPage /> },
      { path: "/products", element: <AllProducts /> },
      { path: "/products/:id", element: <DetailPage /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add",
        element: (
          <ProtectedRoute requireAdmin>
            <AddProductPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/join", element: <JoinPage /> },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setTimeout(() => setIsLoading(false), 1000);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className="App">
          {isLoading ? <Loading /> : <RouterProvider router={router} />}
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
