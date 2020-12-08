import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

const App = () => {
  return (
    <div className='container'>
      <Router>
        <NavbarComponent />
        <Route exact path='/' component={HomeScreen}></Route>
        <Route exact path='/product/:id' component={ProductScreen}></Route>
        <Route exact path='/login' component={LoginScreen}></Route>
        <Route exact path='/register' component={RegisterScreen}></Route>
        <Route exact path='/cart' component={CartScreen}></Route>
        <Route exact path='/profile' component={ProfileScreen}></Route>
      </Router>
    </div>
  );
};

export default App;
