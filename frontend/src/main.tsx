import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router";
import "./index.css";
// import HomeScreen from "./pages/home-screen";
import { ThemeProvider } from "./context/theme-provider";
import LoginScreen from "./pages/auth/login-screen";
import MainScreen from "./pages/main-screen";

import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/landing-screen";
import MembershipDashboard from "./pages/membership.tsx";
import RegisterScreen from "./pages/auth/register-screen.tsx";
import Reports from "./pages/reports.tsx";
import Profile from "./pages/profile.tsx";
// import RegisterScreen from "./pages/auth/register-screen";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,

    },
    {
        path: "/login",
        element: <LoginScreen />,

    },
    {
        path: "/register",
        element: <RegisterScreen />,

    },

    {
        path: "/all-invoices",
        element: <MainScreen />,
        children: [
            {
                index: true,
                element: <MembershipDashboard />,
            },
        ]
    },
    {
        path: "/reports",
        element: <MainScreen />,
        children: [
            {
                index: true,
                element: <Reports />,
            },
        ]
    },

    {
        path: "/profile",
        element: <MainScreen />,
        children: [
            {
                index: true,
                element: <Profile />,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <MainScreen />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);