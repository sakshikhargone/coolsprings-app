import Icon from "@mdi/react";

const IconComponent = ({
  iconName,
  onClicked,
  cssClass,
  size,
  title,
  color,
}) => {
  const clickHandler = () => {
    onClicked();
  };
 return (
    <>
      <Icon
        path={iconName}
        title={title}
        size={size}
        color={color}
        onClick={clickHandler}
        className={cssClass}
      />
    </>
  );
};
export default IconComponent;
