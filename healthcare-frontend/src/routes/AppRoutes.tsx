import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/Home";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<PublicLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}