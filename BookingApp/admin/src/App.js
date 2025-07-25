import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  const ProtectesRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectesRoute>
                  <Home />
                </ProtectesRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectesRoute>
                    <List columns={userColumns}/>
                  </ProtectesRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectesRoute>
                    <Single />
                  </ProtectesRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectesRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectesRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectesRoute><List columns={hotelColumns} /></ProtectesRoute>} />
              <Route
                path=":productId"
                element={
                  <ProtectesRoute>
                    <Single />
                  </ProtectesRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectesRoute>
                    <NewHotel />
                  </ProtectesRoute>
                }
              />
            </Route>

            <Route path="rooms">
              <Route index element={<ProtectesRoute><List columns={roomColumns} /></ProtectesRoute>} />
              <Route
                path=":productId"
                element={
                  <ProtectesRoute>
                    <Single />
                  </ProtectesRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectesRoute>
                    <NewRoom />
                  </ProtectesRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
