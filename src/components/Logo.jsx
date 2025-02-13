import { Link } from "react-router-dom";
import LogoImg from "../assets/logo[1].png";
const Logo = () => {
  return (
    <div className="row">
      <div className="col-sm-8">
        <Link to="/">
          <img
            src={LogoImg}
            alt="logo"
            className="rounded"
          />
        </Link>
      </div>
    </div>
  );
};
export default Logo;
