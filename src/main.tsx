import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import AuthLayouts from "./pages/layouts/AuthLayouts.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Toaster duration={2000} position="top-right" />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/test" element={<><h1>Hallo ini test</h1></>} />
      <Route element={<AuthLayouts />}>
          <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
