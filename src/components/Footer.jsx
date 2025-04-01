import { socialIcon } from "../util/socialIcon";

import { Link } from "react-router-dom";
import IconComponent from "./IconComponent";

const Footer = () => {
  return (
    <div className="row footer ">
      <div className="col-sm-10 col-12 offset-sm-5 offset-3 ">
        {socialIcon.map((icon, index) => {
          return (
            <Link
              to={icon.url}
              key={index}
              className="px-1 icon">
              <IconComponent
                iconName={icon.icon}
                size={1}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Footer;
