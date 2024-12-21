import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { pathNames } from "../constants/pathname";
import Login from "../pages/Login";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Deposit from "../pages/Deposit";
import Profile from "../pages/Profile";
import Wall from "../pages/Wall";
import CreateAccount from "../pages/Account/CreateAccount";
import EditAccount from "../pages/Account/EditAccount";

const router = createBrowserRouter([

    {
        path: pathNames.login,
        element: <Login />,
    },
    {
        path: pathNames.home,
        element: <DefaultLayout />,
        children: [
            {
                path: pathNames.home,
                element: <Home />
            },
            {
                path: pathNames.pricing,
                element: <Pricing />
            },
            {
                path: pathNames.deposit,
                element: <Deposit />
            },
            {
                path: pathNames.profile,
                element: <Profile />
            },
            {
                path: pathNames.wall,
                element: <Wall />
            },
            {
                path: pathNames.createAccount,
                element: <CreateAccount />
            },
            {
                path: pathNames.editAccount,
                element: <EditAccount />
            }
        ],
    },
    { path: "*", loader: () => redirect(pathNames.home) },

] as RouteObject[]);

export default router;
