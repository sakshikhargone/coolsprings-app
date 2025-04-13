import { useState, useEffect } from "react";
//import { mdiEmailOutline } from "@mdi/js";
import Heading from "../components/Heading";
import { ContactModel } from "../model/contactModel";
import styles from "../css/Contact.module.css";
import { AddEnquiry } from "../services/enquiry";
import Loader from "../components/Loader";
import Envlope from "../assets/envlope.gif";

const Contact = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(new ContactModel());
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (
      mobileRegex.test(formData.contactNo) &&
      formData.message &&
      emailRegex.test(formData.email)
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [formData]);

  const closeToastHandler = () => {
    setShow(false);
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };
  const submitHandler = async () => {
    setShow(true);
    console.log("contact", formData);
    await AddEnquiry(formData);
    setTimeout(closeToastHandler, 6000);
    setFormData({});
  };
  const contactValidationHandler = () => {
    if (formData.contactNo && !mobileRegex.test(formData.contactNo)) {
      setError("mobile no is invalid");
    } else {
      setTimeout(() => setError(false), 1000);
    }
  };
  const emailValidator = () => {
    if (formData.email && !emailRegex.test(formData.email)) {
      setMessage("email is invalid");
    } else {
      setTimeout(() => setMessage(false), 1000);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 col-sm-10 offset-sm-2">
          <Heading content={"Reach Out for Inquiries & Bookings"} />
        </div>

        <div
          className={`row d-flex justify-content-center ${styles.contactBg} mt-sm-4 mb-sm-4`}>
          <div
            className={`col-6 col-sm-2 mt-sm-5 offset-sm-1 ${styles.envlopeSection}`}>
            <img
              src={Envlope}
              alt="Envlope"
              className={`${styles.envlope}`}
            />
          </div>
          <div className=" col-sm-8 mt-4 mt-sm-5 offset-1 ms-5">
            <form>
              <div className="row ms-sm-5 ">
                <div className="col-10 col-sm-8 ">
                  <input
                    type="text"
                    className={`form-control rounded-5 w-100 ms-sm-5  ${
                      styles.formOption
                    }${error && styles.formField}`}
                    name="contactNo"
                    maxLength={10}
                    value={formData.contactNo}
                    placeholder="Contact No."
                    required
                    onChange={inputHandler}
                    onMouseLeave={contactValidationHandler}
                  />
                  {error && (
                    <p className="position-absolute text-danger fs-6 ms-sm-5">
                      {error}
                    </p>
                  )}
                </div>
              </div>
              <div className="row ms-sm-5 mt-1">
                <div className="col-10 col-sm-8 mt-4">
                  <input
                    type="email"
                    className="form-control rounded-5 w-100 ms-sm-5"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={inputHandler}
                    onMouseLeave={emailValidator}
                  />
                  {message && (
                    <p className="position-absolute text-danger fs-6 ms-sm-5">
                      {message}
                    </p>
                  )}
                </div>
              </div>
              <div className="row ms-sm-5 mt-1">
                <div className="col-10 col-sm-8 mt-4">
                  <textarea
                    name="message"
                    type="text"
                    className="form-control rounded-3 w-100 ms-sm-5"
                    rows="3"
                    placeholder="Message"
                    required
                    onChange={inputHandler}></textarea>
                </div>
              </div>
              <div className="row ms-sm-5 mb-4 mb-sm-5">
                <div className="col-10 col-sm-8 mt-4">
                  <button
                    type="button"
                    className="btn btn-dark w-100 ms-sm-5 "
                    onClick={submitHandler}
                    disabled={!disableBtn}>
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {show && (
        <div className="row mt-5">
          <div className="col-sm-3 d-flex align-item-end bg-white rounded text-dark">
            <span>
              <button
                type="button"
                className="btn btn-black fw-bold"
                onClick={closeToastHandler}>
                X
              </button>
              <p className="px-1">Thank you for contact!</p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
