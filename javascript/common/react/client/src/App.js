import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import { JewelryList } from "../src/components/JewelryList/JewelryList";
import { JewelryItem } from "../src/components/JewelryItem/JewelryItem";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "../src/components/Home/Home";
import { Bag } from "./components/Bag/Bag";
import { CompleteOrder } from "./components/CompleteOrder/CompleteOrder";
import { CompleteCheckout } from "./components/CompleteCheckout/CompleteCheckout";
import { WishListProvider } from "./contexts/WishListContext";
import { BagProvider } from "./contexts/BagContext";
import { RouteGuard } from "./components/RouteGuard/RouteGuard";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { Wishlist } from "./components/Wishlist/WishList";
import { OrderConfirmation } from "./components/OrderConfirmation/OrderConfirmation";
import { SearchResult } from "./components/Search/SearchResult/SearchResult";
import { Search } from "./components/Search/Search";

function App() {
  return (
    <UserUUIDProvider>
      <AuthProvider>
        <WishListProvider>
          <BagProvider>
            <div className={styles["app"]}>
              <Header />
              <main className={styles["main"]}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/display/:user" element={<Search />} />
                  <Route path="/search" element={<SearchResult />} />
                  <Route path="/:categoryId" element={<JewelryList />} />
                  <Route element={<RouteGuard />}>
                    <Route
                      path="/complete-order/:userId"
                      element={
                        <RouteGuard>
                          <CompleteOrder />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/complete-checkout/:userId"
                      element={
                        <RouteGuard>
                          <CompleteCheckout />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/order-confirmation/:userId"
                      element={
                        <RouteGuard>
                          <OrderConfirmation />
                        </RouteGuard>
                      }
                    />
                    <Route path="/user/logout" element={<Logout />} />
                  </Route>
                  <Route
                    path="/:categoryId/:jewelryId"
                    element={<JewelryItem />}
                  />
                  <Route path="/user/login" element={<Login />} />
                  <Route path="/user/register" element={<Register />} />
                  <Route path="/user/details" element={<UserDetails />} />
                  <Route path="/bag/display/:user" element={<Bag />} />
                  <Route path="/bag/add/:jewelryId" element={<JewelryItem />} />
                  <Route path="/bag/decrease/:bagId" element={<Bag />} />
                  <Route path="/bag/increase/:bagId" element={<Bag />} />
                  <Route path="/bag/update/:bagId" element={<Bag />} />
                  <Route path="/bag/remove/:bagId" element={<Bag />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route
                    path="/wishlist/create/:jewelryId"
                    element={<JewelryList />}
                  />
                  <Route path="*" element={<h1>404</h1>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BagProvider>
        </WishListProvider>
      </AuthProvider>
    </UserUUIDProvider>
  );
}

export default App;
