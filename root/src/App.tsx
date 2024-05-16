import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import BaseLayout from "./shared/ui/layout";
import "antd/dist/reset.css";
import { Spin } from "antd";

const RemoteApp1 = lazy(() => import("dashboard1/dashboard"));
const RemoteApp2 = lazy(() => import("dashboard2/dashboard"));

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />} path="/">
            <Route path="/app1/*" element={<RemoteApp1 />} />
            <Route path="/app2/*" element={<RemoteApp2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
