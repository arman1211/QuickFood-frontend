import { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export class Main extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="w-75% mx-auto">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Main;
