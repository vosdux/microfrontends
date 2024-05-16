import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import BaseLayout from "./shared/ui/layout";
import DashboardPage from "./pages/dashboard";
import UserPage from "./pages/user-page";

const App: React.FC = () => {
  return (
    <Suspense fallback={"loading"}>
      <BrowserRouter basename="/app1">
        <Routes>
          <Route element={<BaseLayout />} path="/">
            <Route element={<UserPage />} index />
            <Route element={<DashboardPage />} path="/dashboard" />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
