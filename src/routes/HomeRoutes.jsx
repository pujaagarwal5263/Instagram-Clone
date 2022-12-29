import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routepath";
import Authenticate from "./Authenticate";
import React from "react";

const AuthComponent = React.lazy(() => import("../pages/Auth/Auth"));
const HomeComponent = React.lazy(() => import("../pages/Home/Home"));
const SocketComponent =  React.lazy(() => import("../pages/Socket/Socket"));
const ProfileComponent = React.lazy(() =>
  import("../pages/ProfilePage/ProfilePage")
);

const HomeRoutes = () => {
  return (
    <React.Suspense fallback={<h2>Loading...</h2>}>
      <Router>
        <Routes>
          <Route element={<AuthComponent />} path={ROUTES.AUTH_PAGE} />
          <Route
            path={ROUTES.HOME_PAGE}
            element={
              <Authenticate>
                <HomeComponent />
              </Authenticate>
            }
          />
          <Route
            path={ROUTES.PROFILE_PAGE}
            element={
              <Authenticate>
                <ProfileComponent />
              </Authenticate>
            }
          />
            <Route
            path={ROUTES.MESSAGING}
            element={
                <SocketComponent />
              
            }
          />
          <Route path="*" element={<AuthComponent />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default HomeRoutes;
