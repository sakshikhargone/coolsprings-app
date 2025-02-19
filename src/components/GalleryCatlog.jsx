import Image1 from "../assets/img1.png";
import Image2 from "../assets/img2.png";

const GalleryCatlog = () => {
  return (
    <div className="row">
      <div className="col">
        <img
          src={Image1}
          alt="waterpark-image"
        />
        <img
          src={Image2}
          alt="waterpark-image"
        />
      </div>
    </div>
  );
};
export default GalleryCatlog;
