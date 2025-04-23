import loader from "../assets/loader.svg";
const Loader = () => {
  return (
    <div className="offset-3 offset-sm-4 mt-sm-3">
      <img
        src={loader}
        alt="loading"
      />
      <h5 className="font-chewy-regular ms-5  ms-sm-5">Loading...</h5>
    </div>
  );
};
export default Loader;
