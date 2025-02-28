import { Link } from "react-router-dom";
import GalleryCatlog from "../components/GalleryCatlog";

const About = () => {
  return (
    <div className="row mt-5 ">
      <div className="col-sm-10">
        <h1 className="font-chewy-regular text-center">About Coolspring</h1>
        <p className="mt-5">
          Welcome to Coolspring, your ultimate online ticket booking system
          designed exclusively for waterparks. Our platform ensures a fast,
          secure, and hassle-free ticketing experience, allowing visitors to
          book tickets, access detailed booking information, and track their
          booking history with ease.
          <br />
          At Coolspring, we prioritize user convenience and security by
          integrating QR code-based entry, ensuring a contactless and seamless
          check-in at the waterpark. Whether you're planning a solo trip, a
          family outing, or a group visit, our system provides a smooth and
          efficient booking process.
        </p>
        <hr />
        <Link to="about/gallery">Gallery</Link>
      </div>
    </div>
  );
};

export default About;
