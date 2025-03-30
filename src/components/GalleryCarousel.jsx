import Carousel from "react-bootstrap/Carousel";
import styles from "../css/GalleryCarousel.module.css";
import { galleryItems } from "../util/galleryItems";

const GalleryCarousel = () => {
  return (
    <div className="row mt-4 mb-5">
      <div className="col-sm-9">
        <Carousel
          interval={2000}
          pause={false}>
          {galleryItems.map((item, index) => {
            return (
              <Carousel.Item>
                <img
                  src={item.url}
                  alt={item.text}
                  key={index}
                  className={` img-fluid ${styles.catlog}"`}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
export default GalleryCarousel;
