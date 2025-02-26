import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <div className="row">
      <div className="col-sm-8">
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
