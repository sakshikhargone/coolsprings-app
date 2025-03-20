import Waterpark from "../assets/waterpark.png";
import styles from "../css/About.module.css";
const About = () => {
  return (
    <div
      className="row mt-5
">
      <div className="col-sm-12">
        <div className="row">
          <div className="col-10 col-sm-5">
            <img
              src={Waterpark}
              alt="WaterPark"
              className={`${styles.waterpark}`}
            />
          </div>
          <div className="col-12 col-sm-6 ml-2 mt-4 ">
            <h2 className="font-chewy-regular "> About Coolspring!</h2>
            <p>
              Welcome to <b>Coolspring Waterpark</b>, your ultimate destination
              for fun, adventure, and relaxation! Nestled in a picturesque
              location, Coolspring Waterpark offers a thrilling escape for
              families, friends, and water enthusiasts of all ages.
              <br /> From heart-pounding water slides and a massive wave pool to
              a lazy river and dedicated kids’ play areas, we have attractions
              for everyone.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h4 className="font-chewy-regular ">Thrilling Water Attractions</h4>
            <p>
              Coolspring Waterpark, spanning over 30,000 sq. ft., offers
              exhilarating water slides, a massive wave pool, and a relaxing
              lazy river. From high-speed slides to interactive water play
              zones, there's excitement for every age.
              <br />
              Our shaded cabanas and poolside cafés provide the perfect retreat.
              Sip a chilled drink while enjoying the vibrant atmosphere or let
              the kids explore the dedicated play area.
            </p>
          </div>
        </div>
        <hr />
        <section>
          <h4 className="font-chewy-regular ">Stay at Coolspring Resort</h4>
          <p>
            Adjacent to the waterpark, Coolspring Resort offers modern
            accommodations with luxury amenities, including a
            temperature-controlled pool, gym, banquet halls, and more.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
