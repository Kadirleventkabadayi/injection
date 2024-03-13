import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/signin",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={myRouter} />;
}

export default App;
