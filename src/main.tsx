import ReactDOM from "react-dom/client";
import type { LoaderFunctionArgs } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Container } from "./components/container.tsx";
import { Login } from "./components/login.tsx";
import ErrorPage from "@/error-page";
import { Dashboard } from "./components/dashboard.tsx";
import { fakeAuthProvider } from "@/auth.ts";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Container />
      </App>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: rootLoader,
        element: <Dashboard />,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        element: <Login />,
      },
      {
        path: "dashboard",
        loader: authCheckLoader,
        element: <Dashboard />,
      },
    ],
  },
]);

async function rootLoader() {
  if (!fakeAuthProvider.isAuthenticated) {
    return redirect("/login");
  }
  return redirect("/dashboard");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/dashboard");
  }
  return null;
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("email") as string | null;
  if (!username) {
    return { error: "You must provide a username to log in" };
  }
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    return { error: "Invalid login attempt" };
  }
  return redirect("/dashboard");
}

function authCheckLoader({}: LoaderFunctionArgs) {
  if (!fakeAuthProvider.isAuthenticated) {
    return redirect("/login");
  }
  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />,
);
