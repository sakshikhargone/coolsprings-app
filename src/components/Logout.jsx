import { mdiPower } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import IconComponent from "./IconComponent";

const Logout = () => {
  const navigator = useNavigate();
const logoutHandler = () => {
    sessionStorage.clear();
    navigator("/");
  };
  return (
    <>
      <IconComponent
        iconName={mdiPower}
        onClicked={logoutHandler}
        cssClass={"logout mt-2 ms-2"}
        size={1.5}
        color={"#fff"}
        title={"logout"}
      />
    </>
  );
};

export default Logout;
