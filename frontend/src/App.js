import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

const App = () => {
  return (
    <div className='container'>
      <Router>
        <NavbarComponent />
        <Route exact path='/' component={HomeScreen}></Route>
        <Route exact path='/product/:id' component={ProductScreen}></Route>
      </Router>
    </div>
  );
};

export default App;
