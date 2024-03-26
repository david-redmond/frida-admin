import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes";
import HomePage from "./pages/homePage";
import ServicesPage from "./pages/productsAndServices";
import OrdersPage from "./pages/orders";
import { Helmet } from "react-helmet";
import Login from "./pages/Auth";
import Register from "./pages/Auth/register";
import UseToken from "./hooks/useToken";
import http from "./http";
import { useDispatch } from "react-redux";
import {
  initializeActiveCompanyId,
  setAssociatedCompanies,
  setUserDetails,
  setUserLoggedIn,
} from "./store/actions";
import WebsiteSettings from "./pages/websiteSettings";
import PageWrapper from "./components/PageWrapper";
import Profile from "./pages/profile";

let isFetching: boolean = false;

function App() {
  const dispatch = useDispatch();

  const { token, setToken } = UseToken();

  React.useEffect(() => {
    !!token && fetchUser();
  }, [token]);

  if (!token) {
    return (
      <div style={{ position: "relative" }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Project Frida | Admin Panel`}</title>
        </Helmet>
        <Routes>
          <Route
            path={AppRoutes.register}
            element={<Register setToken={setToken} />}
          />
          <Route path={"*"} element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    );
  }

  const fetchUser = async () => {
    if (isFetching) {
      return;
    }
    isFetching = true;
    const response = await http.get("/api/user");
    if (!!response && !!response.data) {
      // @ts-ignore
      dispatch(setUserDetails(response.data));
      dispatch(setUserLoggedIn());

      const allClients: any[] = [];
      const activeCompanyId = response.data.associatedClients[0];

      if (!!activeCompanyId) {
        await Promise.allSettled(
          response.data.associatedClients.map(async (_clientId: string) => {
            const clientResponse = await http.get(`/api/client/${_clientId}`);
            allClients.push(clientResponse.data);
          })
        );
        dispatch(initializeActiveCompanyId(activeCompanyId));
        dispatch(setAssociatedCompanies(allClients));
      }
    }
    isFetching = false;
  };

  return (
    <PageWrapper>
      <Routes>
        <Route path={AppRoutes.home} element={<HomePage />} />
        <Route path={AppRoutes.products} element={<ServicesPage />} />
        <Route path={AppRoutes.orders} element={<OrdersPage />} />
        <Route path={AppRoutes.websiteSettings} element={<WebsiteSettings />} />
        <Route path={AppRoutes.profile} element={<Profile />} />
      </Routes>
    </PageWrapper>
  );
}

export default App;
