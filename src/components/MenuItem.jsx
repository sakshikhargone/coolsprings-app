import { Link } from "react-router-dom";
const MenuItem = ({ url, text }) => {
  return <Link to={url}>{text}</Link>;
};
export default MenuItem;
