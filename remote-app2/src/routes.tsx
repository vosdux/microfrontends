import DashboardPage from "./pages/dashboard";
import UserPage from "./pages/user-page";
import BaseLayout from "./shared/ui/layout";

const routesArr = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <UserPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
    ]
  }
];

export default routesArr;
