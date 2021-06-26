import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Landing />
            <Footer />
        </Router>
    );
};

export default App;
