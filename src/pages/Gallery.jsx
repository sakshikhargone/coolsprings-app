import GalleryCarousel from "../components/GalleryCarousel";
import Heading from "../components/Heading";

const Gallery = () => {
  return (
    <div className="row ">
      <div className="col-sm-11 offset-sm-2 ">
        <Heading
          content={"Explore the Coolspring Gallery"}
          className="text-center"
        />
        <GalleryCarousel />
      </div>
    </div>
  );
};

export default Gallery;
