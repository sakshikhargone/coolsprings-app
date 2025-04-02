import styles from "../css/Heading.module.css";
const Heading = ({ content }) => {
  return (
    <div className="row">
      <div className="col-sm-10 ">
        <h1
          className={`font-chewy-regular mb-sm-5 
        mt-sm-5 mt-3 text-center heading ${styles.title}`}>
          {content}
        </h1>
      </div>
    </div>
  );
};
export default Heading;
