import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import JoinAsEmployee from "../Pages/JoinAsEmployee";
import JoinAsHR from "../Pages/JoinAsHR";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import EmRequestedAsset from "../Pages/EmRequestedAsset";
import EmRequestAsset from "../Pages/EmRequestAsset";
import EmTeam from "../Pages/EmTeam";
import EmHome from "../Pages/EmHome";
import Profile from "../Pages/Profile";
import HrHome from "../Pages/HrHome";
import HrAssetList from "../Pages/HrAssetList";
import HrAddAsset from "../Pages/HrAddAsset";
import HrAllRequest from "../Pages/HrAllRequest";
import HrMyEmployeeList from "../Pages/HrMyEmployeeList";
import HrAddAnEmployee from "../Pages/HrAddAnEmployee";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
import PaymentPage from "../Pages/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "*",
        element:<ErrorPage></ErrorPage> , 
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/join-as-employee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "/join-as-hr-manager",
        element: <JoinAsHR></JoinAsHR>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/employee",
        element: <PrivateRoute><EmHome></EmHome></PrivateRoute>,
      },
      {
        path: "/employee/my-assets",
        element:<PrivateRoute><EmRequestedAsset></EmRequestedAsset></PrivateRoute> ,
      },
      {
        path: "/employee/request-asset",
        element: <PrivateRoute><EmRequestAsset></EmRequestAsset></PrivateRoute>,
      },
      {
        path: "/employee/my-team",
        element: <PrivateRoute><EmTeam></EmTeam></PrivateRoute>,
      },
      {
        path: "/employee/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: "/hr",
        element: <PrivateRoute><HrHome></HrHome></PrivateRoute>,
      },
      {
        path: "/hr/asset-list",
        element: <PrivateRoute><HrAssetList></HrAssetList></PrivateRoute>,
      },
      {
        path: "/hr/add-asset",
        element: <PrivateRoute><HrAddAsset></HrAddAsset></PrivateRoute>,
      },
      {
        path: "/hr/all-requests",
        element: <PrivateRoute><HrAllRequest></HrAllRequest></PrivateRoute>,
      },
      {
        path: "/hr/employee-list",
        element: <PrivateRoute><HrMyEmployeeList></HrMyEmployeeList></PrivateRoute>,
      },
      {
        path: "/hr/add-employee",
        element: <PrivateRoute><HrAddAnEmployee></HrAddAnEmployee></PrivateRoute>,
      },
      {
        path: "/hr/hr-profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: "/payment",
        element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>,
      },
    ],
  },
]);

export default router;
