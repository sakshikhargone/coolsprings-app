import MenuItem from "./MenuItem";
import { menuItems } from "../util/menuItems";
const DesktopMenu = () => {
  return (
    <div className="row  ">
      <div className="col-sm-10  mt-4 offset-3">
        <nav className="menu-desktop">
          {menuItems.map((menuItem, index) => {
            return (
              <MenuItem
                text={menuItem.text}
                url={menuItem.url}
                key={index}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
};
export default DesktopMenu;
