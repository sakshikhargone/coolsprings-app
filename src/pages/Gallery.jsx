import GalleryCatlog from "../components/GalleryCatlog";
import Image1 from "../assets/img1.png";
const Gallery = () => {
  return (
    <div className="row">
      <div className="col-8">
        <img
          src={Image1}
          alt="waterpark-image"
        />
      </div>
    </div>
  );
};
export default Gallery;
