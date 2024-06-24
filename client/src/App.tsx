import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ShopDetails from "./pages/ShopDetails";
import { useSelector } from "react-redux";
import { RootStateType } from "./store/store";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import UserOrders from "./pages/UserOrders";

function App() {
  const isLoggedIn = useSelector(
    (state: RootStateType) => state.auth.isLoggedIn
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/detail/:shopId"
          element={
            <MainLayout>
              <ShopDetails />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <MainLayout>
              <SignIn />
            </MainLayout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/cart"
              element={
                <MainLayout>
                  <Cart />
                </MainLayout>
              }
            />
            <Route
              path="/shop/:shopId/order"
              element={
                <MainLayout>
                  <Order />
                </MainLayout>
              }
            />
            <Route
              path="/my-orders"
              element={
                <MainLayout>
                  <UserOrders />
                </MainLayout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
