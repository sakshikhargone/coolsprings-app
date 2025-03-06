import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <div className="row">
      <div className="col-9">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="rounded"
          />
        </Link>
      </div>
    </div>
  );
};
export default Logo;
