import { getMenuItems } from "../util/menuItems";
import MenuItem from "./MenuItem";
import Logo from "./Logo";
const Header = () => {
  const menuItems = getMenuItems();
  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-sm-4">
        <Logo />
      </div>
      <div className="col-sm-8 d-flex justify-content-center">
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              url={item.url}
              key={item.index}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Header;
