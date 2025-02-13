import { Link } from "react-router-dom";
const MenuItem = ({ url, text }) => {
  return (
    <Link
      to={url}
      className="text-white fs-4 px-4 ms-4 font-chewy-regular">
      {text}{" "}
    </Link>
  );
};
export default MenuItem;
