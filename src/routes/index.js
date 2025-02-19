import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MyBookings from "../pages/MyBookings";
import Gallery from "../pages/Gallery";

const appRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        Component={Home}></Route>
      <Route
        path="about"
        Component={About}></Route>
      <Route
        path="contact"
        Component={Contact}></Route>
      <Route
        path="bookings"
        Component={MyBookings}>
        <Route
          path="about/gallery"
          Component={Gallery}
        />
      </Route>
    </Routes>
  );
};
export default appRoutes;
