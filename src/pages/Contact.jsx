const Contact = () => {
  return (
    <div className="row mt-5">
      <div className="col-sm-8">
        <form>
          <div>
            <label html="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
