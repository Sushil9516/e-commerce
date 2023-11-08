import React from "react";
import "./App.css";
import { useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
// import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";




// import store from './store';
// const state = store.getState();
// const state = store.getState().cart.cartItems;
// console.log(state);



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  //dummy changes

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

       {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" Component={Home} />

       <Route path="/product/:id" Component={ProductDetails}></Route>
        
        <Route exact path="/products" Component={Products} />

        <Route path="/products/:keyword" Component={Products} />

        <Route exact path="/search" Component={Search} /> 

        <Route exact path="/contact" Component={Contact} />

        <Route exact path="/about" Component={About} />

        {isAuthenticated && <Route exact path="/account" Component={Profile} />}

        {isAuthenticated && <Route exact path="/me/update" Component={UpdateProfile} />}

        {isAuthenticated && <Route exact path="/password/update" Component={UpdatePassword}/>}


       <Route exact path="/password/forgot" Component={ForgotPassword} />

        <Route exact path="/password/reset/:token" Component={ResetPassword} />

        <Route exact path="/login" Component={LoginSignUp} />

        <Route exact path="/cart" Component={Cart} />

        <Route exact path="/login/shipping" Component={Shipping} />

        {isAuthenticated && <Route exact path="/orders" Component={MyOrders} />}

        <Route exact path="/success" Component={OrderSuccess} />

        <Route isAdmin={true} exact path="/admin/dashboard" Component={Dashboard} />

        <Route exact path="/admin/products" isAdmin={true} Component={ProductList} />
      
        <Route exact path="/admin/product" isAdmin={true} Component={NewProduct}/>

        <Route exact path="/admin/product/:id" isAdmin={true} Component={UpdateProduct}/>

        <Route exact path="/admin/orders" isAdmin={true} Component={OrderList} />

        <Route exact path="/admin/order/:id" isAdmin={true} Component={ProcessOrder}/>

        <Route exact path="/admin/users" isAdmin={true} Component={UsersList}/>

        <Route exact path="/admin/user/:id" isAdmin={true} Component={UpdateUser} />

        <Route exact path="/admin/reviews" isAdmin={true} Component={ProductReviews}/>

        <Route Component={ window.location.pathname === "/process/payment" ? null : NotFound}/>
        <Route path="*" Component={NotFound}/>


      </Routes>

      <Routes>
        {isAuthenticated && <Route exact path="/order/confirm" Component={ConfirmOrder} />}
       
       {isAuthenticated && <Route exact path="/order/:id" Component={OrderDetails} />}
        </Routes>

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {/* Your other routes */}
            <Route exact path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}
      <Footer />

    </Router>
  );
}

export default App;
