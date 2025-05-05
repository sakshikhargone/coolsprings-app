import { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import MenuItem from "./MenuItem";
import { menuItems } from "../util/menuItems";
import styles from "../css/MobileMenu.module.css";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => {
    setShowMenu(true);
  };
  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <div className={`row  d-md-none `}>
      <div className="col ">
        <div className="row ">
          <div className="col-sm-1 offset-10 hamburger">
            <Icon
              path={mdiMenu}
              size={1}
              onClick={showMenuHandler}
            />
          </div>
        </div>
        {showMenu && (
          <div className={`row ${styles.mobileMenu}`}>
            <div className="col-sm-1  d-flex justify-content-end ml-5 ">
              <nav>
                {menuItems.map((menuItem, index) => {
                  return (
                    <div onClick={closeMenuHandler}>
                      <MenuItem
                        text={menuItem.text}
                        url={menuItem.url}
                        key={index}
                        className="mt-5"
                      />
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MobileMenu;
