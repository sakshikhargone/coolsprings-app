import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBooking, getBooking } from "../services/booking";
import { getCustomer } from "../services/customer";
import { getDiscountValue } from "../services/discount";
import { BookingModel } from "../model/bookingModel";
import { sendSms } from "../services/sms";
import Heading from "../components/Heading";
import styles from "../css/BookingForm.module.css";

const BookingForm = () => {
  const navigation = useNavigate();
  const [booking, setBoooking] = useState(new BookingModel());
  const [showUPITranx, setShowUPITranx] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [intialAmount, setInitialAmount] = useState(0.0);
  const [isSumbitClickable, setIsSubmtClickable] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [error, setError] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const pricePerTicket = process.env.REACT_APP_PRICE_PER_COST;
  const mobileRegex = /^[6-9]\d{9}$/;
  const nameRegex = /^[A-Za-z\s]*$/;

  useEffect(() => {
    debugger;
    setAmount(1 * pricePerTicket);
    if (
      BookingModel.customerName &&
      BookingModel.customerPhone &&
      BookingModel.numOfTickets &&
      BookingModel.paymentMode
    ) {
      setIsSubmtClickable(true);
      console.log("true");
    } else {
      setIsSubmtClickable(false);
      console.log("false");
    }
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "numOfTickets" && value?.toString().length > 0) {
      let total = e.target.value * pricePerTicket;
      setAmount(total);
      setInitialAmount(total);
    }

    setBoooking((oldBookking) => ({
      ...oldBookking,

      [name]: value,
    }));
  };

  const mobileHandler = () => {
    if (
      booking.customerPhone?.length > 0 &&
      mobileRegex.test(booking.customerPhone)
    ) {
      (async () => {
        const mobileMatching = await getCustomer(booking?.customerPhone);
        booking.customerName = mobileMatching?.name;
        booking.customerId = mobileMatching?.id;
      })();
      setTimeout(() => setError(false), 1000);
      return;
    } else {
      if (!booking.customerPhone) {
        setError("mobile number is required");
      } else if (!mobileRegex.test(booking.customerPhone)) {
        setError("mobile number is invalid");
      }
    }
  };

  const nameHandler = () => {
    if (booking.customerName && !nameRegex.test(booking.customerName)) {
      setValidationMessage("invalid name");
    } else {
      setValidationMessage("");
      setTimeout(() => setValidationMessage(false), 1000);
    }
  };

  const discountHandler = async () => {
    if (booking.discountCode && booking.discountCode.length > 1) {
      const { value, id } = await getDiscountValue(booking.discountCode);
      if (value) {
        const amnt = pricePerTicket * booking.numOfTickets;
        let total = amnt - amnt * (value / 100);
        setAmount(total);
        setBoooking((old) => ({
          ...old,
          discountId: id,
        }));
        return;
      }
    }

    let total = pricePerTicket * booking.numOfTickets;
    setAmount(total);
    setBoooking((old) => ({
      ...old,
      discountId: null,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const bookingDetail = {
      ...booking,
      actualAmount: intialAmount,
      paidAmount: amount,
    };

    const { bookingId } = await addBooking(bookingDetail);
    console.log(bookingDetail);
    debugger;
    if (bookingId) {
      navigation(`/booking/${bookingId}`);
      sendSms(
        `Hey, Thank your booking with us. Download your ticket. https://50f3-103-171-189-185.ngrok-free.app/${bookingId}`,
        booking.customerPhone
      );
    } else {
      navigation("/error");
    }
  };

  const upiTransactionHandler = () => {
    if (booking.paymentMode === "UPI") {
      setShowUPITranx(true);
    } else if (booking.paymentMode === "Cash") {
      setShowUPITranx(false);
    }
  };

  const formValidationHandler = () => {
    const form = document.getElementById("addBooking");
    if (form) {
      setIsSubmtClickable(form.checkValidity());
    }
  };

  return (
    <div className="row">
      <div className={`col-12 col-sm-10 `}>
        <Heading content={"Book Your Adventure Splash Now !"} />
        <form
          id="addBooking"
          onSubmit={formSubmitHandler}
          noValidate
          className={`offset-sm-1 ${styles.bookingForm}`}>
          <div className="row mb-5 mt-4">
            <div className="col-10 col-sm-3">
              <label htmlFor="phone">Mobile no.</label>
            </div>
            <div className="col-10 col-sm-6">
              <input
                type="text"
                required
                name="customerPhone"
                className="form-control w-75"
                maxLength={10}
                value={booking.customerPhone}
                onChange={inputHandler}
                onMouseLeave={mobileHandler}
                autoComplete="off"
                inputMode="numeric"
                placeholder="Your mobile number"
              />
              {error && (
                <p className="position-absolute text-danger fs-6">{error}</p>
              )}
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-10 col-sm-3">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-10 col-sm-6">
              <input
                type="text"
                name="customerName"
                required
                className="form-control w-75"
                min={3}
                value={booking.customerName}
                onChange={inputHandler}
                onMouseLeave={nameHandler}
              />
              {validationMessage && (
                <p className="position-absolute text-danger fs-5">
                  {validationMessage}
                </p>
              )}
            </div>
          </div>
          <hr />

          <div className="row mt-5">
            <div className="col-10 col-sm-3">
              <label htmlFor="ticket">No of tickets</label>
            </div>
            <div className="col-10 col-sm-6">
              <input
                required
                type="number"
                name="numOfTickets"
                className="form-control w-75"
                min={1}
                defaultValue={1}
                onChange={inputHandler}
                onMouseLeave={inputHandler}
              />
            </div>
          </div>

          <div className="row mb-5 mt-4">
            <div className="col-10 col-sm-3">
              <label htmlFor="discode">Discount code</label>
            </div>
            <div className="col-10 col-sm-6">
              <input
                type="text"
                name="discountCode"
                className="form-control w-75"
                min={3}
                disabled={isDiscountApplied}
                onChange={inputHandler}
                onMouseLeave={discountHandler}
              />
            </div>
          </div>
          <hr />
          <div className="row mt-5">
            <div className="col-10 col-sm-3">
              <label htmlFor="paymode">Payment mode</label>
            </div>
            <div className="col-10 col-sm-6">
              <section className="mb-4">
                <input
                  type="radio"
                  name="paymentMode"
                  value="Cash"
                  className="form-check-input"
                  onChange={inputHandler}
                  defaultChecked
                  onMouseLeave={upiTransactionHandler}
                />
                <label className="mx-2">Cash</label>
              </section>
              <section>
                <input
                  type="radio"
                  name="paymentMode"
                  className="form-check-input"
                  value="UPI"
                  onChange={inputHandler}
                  onMouseLeave={upiTransactionHandler}
                />
                <label className="mx-2">UPI</label>
              </section>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-10 col-sm-3">
              <label htmlFor="amount">Amount</label>
            </div>
            <div className="col-10 col-sm-6">
              <p>{amount ?? 0.0}</p>
            </div>
          </div>

          {showUPITranx && (
            <div className="row mt-4">
              <div className="col-10 col-sm-3">
                <label htmlFor="upiTranx">UPI transaction</label>
              </div>
              <div className="col-10 col-sm-6">
                <input
                  type="password"
                  name="upiTxnRefNumber"
                  className="form-control w-75"
                  min={3}
                  pattern="[0-9]"
                  onChange={inputHandler}
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          <div className="row mt-4">
            <div className="col-10 col-sm-3">
              <button
                type="submit"
                className="btn submit-button"
                disabled={isSumbitClickable}>
                Submit
              </button>
            </div>
            <div className="col-10 col-sm-6"></div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookingForm;
