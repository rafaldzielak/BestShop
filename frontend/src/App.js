import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className='container'>
      <Router>
        <HomeScreen />
      </Router>
    </div>
  );
};

export default App;
