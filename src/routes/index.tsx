import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { pathNames } from "../constants/pathname";
import DefaultLayout from "../layouts/DefaultLayout";
import CreateAccount from "../pages/Account/CreateAccount";
import EditAccount from "../pages/Account/EditAccount";
import Deposit from "../pages/Deposit";
import DetailPost from "../pages/DetailPost";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Profile from "../pages/Profile";
import Wall from "../pages/Wall";
import AuthLayout from "../layouts/AuthLayout";
import Feedback from "../pages/Feedback";

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
                element: <AuthLayout><Profile /></AuthLayout>
            },
            {
                path: pathNames.wall,
                element: <AuthLayout><Wall /></AuthLayout>
            },
            {
                path: pathNames.createAccount,
                element: <AuthLayout><CreateAccount /></AuthLayout>
            },
            {
                path: pathNames.editAccount,
                element: <AuthLayout><EditAccount /></AuthLayout>
            },
            {
                path: pathNames.detailPost,
                element: <DetailPost />
            },
            {
                path: pathNames.feedback,
                element: <AuthLayout><Feedback></Feedback></AuthLayout>
            }
        ],
    },
    { path: "*", loader: () => redirect(pathNames.home) },

] as RouteObject[]);

export default router;
