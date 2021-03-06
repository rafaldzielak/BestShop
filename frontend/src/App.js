import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PayAndShipScreen from "./screens/PayAndShipScreen";
import OrderScreen from "./screens/OrderScreen";
import AllOrdersScreen from "./screensAdmin/AllOrdersScreen";
import AllUsersScreen from "./screensAdmin/AllUsersScreen";
import AllProductsScreen from "./screensAdmin/AllProductsScreen";
import AddProductScreen from "./screensAdmin/AddProductScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import AddCategoriesScreen from "./screensAdmin/AddCategoriesScreen";

const App = () => {
  return (
    <div className='container'>
      <Router>
        <NavbarComponent />
        <Route exact path='/' component={HomeScreen}></Route>
        <Route exact path='/search/:keyword/category/:category' component={HomeScreen}></Route>
        <Route exact path='/search/:keyword' component={HomeScreen}></Route>
        <Route exact path='/category/:category' component={HomeScreen}></Route>
        <Route exact path='/product/:id' component={ProductScreen}></Route>
        <Route exact path='/login' component={LoginScreen}></Route>
        <Route exact path='/register' component={RegisterScreen}></Route>
        <Route exact path='/cart' component={CartScreen}></Route>
        <Route exact path='/profile' component={ProfileScreen}></Route>
        <Route exact path='/checkout' component={PayAndShipScreen}></Route>
        <Route exact path='/order/:id' component={OrderScreen}></Route>
        <Route exact path='/admin/orders' component={AllOrdersScreen}></Route>
        <Route exact path='/admin/users' component={AllUsersScreen}></Route>
        <Route exact path='/admin/products' component={AllProductsScreen}></Route>
        <Route exact path='/admin/products/add' component={AddProductScreen}></Route>
        <Route exact path='/admin/products/edit/:id' component={AddProductScreen}></Route>
        <Route exact path='/admin/categories/add' component={AddCategoriesScreen}></Route>
      </Router>
    </div>
  );
};

export default App;
