import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import { ThemedLayoutV2 } from "components/themedLayout";
import { ThemedHeaderV2 } from "components/themedLayout/header";
import { ThemedSiderV2 } from "components/themedLayout/sider";
import { ThemedTitleV2 } from "components/themedLayout/title";

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  Dashboard,
} from "@mui/icons-material";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });
        const data = await response.json();

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid: data._id,
          })
        );
        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  // function App() {
  //   const authProvider: AuthBindings = {
  //     login: async ({ credential }: CredentialResponse) => {
  //       const profileObj = credential ? parseJwt(credential) : null;

  //       if (profileObj) {
  //         const response = await fetch("http://localhost:8080/api/v1/users", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             name: profileObj.name,
  //             email: profileObj.email,
  //             avatar: profileObj.picture,
  //           }),
  //         });

  //         const data = await response.json();

  //         if (response.status === 200) {
  //           localStorage.setItem(
  //             "user",
  //             JSON.stringify({
  //               ...profileObj,
  //               avatar: profileObj.picture,
  //               userid: data._id,
  //             })
  //           );
  //         } else {
  //           return Promise.reject();
  //         }
  //       }

  //       localStorage.setItem("token", `${credential}`);
  //     },
  //     logout: async () => {
  //       const token = localStorage.getItem("token");

  //       if (token && typeof window !== "undefined") {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //         axios.defaults.headers.common = {};
  //         window.google?.accounts.id.revoke(token, () => {
  //           return {};
  //         });
  //       }

  //       return {
  //         success: true,
  //         redirectTo: "/login",
  //       };
  //     },
  //     onError: async (error) => {
  //       console.error(error);
  //       return { error };
  //     },
  //     check: async () => {
  //       const token = localStorage.getItem("token");

  //       if (token) {
  //         return {
  //           authenticated: true,
  //         };
  //       }

  //       return {
  //         authenticated: false,
  //         error: {
  //           message: "Check failed",
  //           name: "Token not found",
  //         },
  //         logout: true,
  //         redirectTo: "/login",
  //       };
  //     },
  //     getPermissions: async () => null,
  //     getIdentity: async () => {
  //       const user = localStorage.getItem("user");
  //       if (user) {
  //         return JSON.parse(user);
  //       }

  //       return null;
  //     },
  //   };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* <ColorModeContextProvider> */}
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("http://localhost:8080/api/v1")}
            notificationProvider={notificationProvider}
            routerProvider={routerProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "DashboardPage",
                list: "/",
                options: { label: "Dashboard" },
                icon: <Dashboard />,
              },
              {
                name: "Properties",
                list: AllProperties,
                show: PropertyDetails,
                create: CreateProperty,
                edit: EditProperty,
                icon: <VillaOutlined />,
              },
              {
                name: "Agents",
                list: Agents,
                show: AgentProfile,
                icon: <PeopleAltOutlined />,
              },
              {
                name: "Reviews",
                list: "/Reviews",
                icon: <StarOutlineRounded />,
              },
              {
                name: "Messages",
                list: "/Messages",
                icon: <ChatBubbleOutline />,
              },
              {
                name: "My-profile",
                options: { label: "My Profile" },
                list: MyProfile,
                icon: <AccountCircleOutlined />,
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={ThemedHeaderV2}
                      Sider={ThemedSiderV2}
                      Title={ThemedTitleV2}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="create" element={<Home />} />
                </Route>
                <Route path="/Properties">
                  <Route index element={<AllProperties />} />
                  <Route path="create" element={<CreateProperty />} />
                  <Route path=":id" element={<PropertyDetails />} />
                </Route>
                <Route path="/Agents">
                  <Route index element={<AgentProfile />} />
                  <Route path="create" element={<AgentProfile />} />
                </Route>
                <Route path="/My-profile">
                  <Route index element={<MyProfile />} />
                  <Route path="create" element={<MyProfile />} />
                </Route>
                <Route path="/Reviews">
                  <Route index element={<Home />} />
                  <Route path="create" element={<Home />} />
                </Route>
                <Route path="/Messages">
                  <Route index element={<Home />} />
                  <Route path="create" element={<Home />} />
                </Route>
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />
                {/* <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route> */}
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </RefineSnackbarProvider>
        {/* </ColorModeContextProvider> */}
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
