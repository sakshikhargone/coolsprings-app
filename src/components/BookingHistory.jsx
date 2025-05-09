import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mdiPhone } from "@mdi/js";
import { getBookings} from "../services/customer";
import NoBooking from "./NoBooking";
import Logout from "./Logout";
import IconComponent from "./IconComponent";
import Photo from "../assets/profile.png";
import { addFile, getFile } from "../services/file";
import styles from "../css/BookingHistory.module.css";
import Loader from "./Loader";

const BookingHistory = () => {
  const navigator = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const profilePicUrl = process.env.REACT_APP_PROFILE_PIC_URL;
  const { cId } = useParams();
  const [bookingHistory, setBookingHistory] = useState(null);
  const [showFileUploader, setShowFileUploader] = useState(false);

  useEffect(() => {
    debugger;
    setTimeout(() => setShowLoader(false), 1000);
    const bookingDetail = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        let bookings = await getBookings(cId);
        setBookingHistory(bookings);
      } else {
        navigator("/bookings");
      }
    };
    setTimeout(() => bookingDetail(), 1000);
  }, [cId]);

  const profileFileHandler = async (e) => {
    console.log(bookingHistory);
    const profileData = {
      customerPhone: bookingHistory?.data?.customerPhone,
      profilePic: e.target.files[0],
    };
    await addFile(profileData);

    const response = await getFile(bookingHistory?.data?.customerPhone);
    const { fileName } = response?.data;

    setProfilePic(
      `${profilePicUrl}/${bookingHistory?.data?.customerPhone}${fileName}`
    );
  };
  const FileUploader = () => {
    debugger;
    setShowFileUploader(true);
  };

  return (
    <div className="row mt-sm-5">
      <div className="col">
        <>
          <Logout />
          {showLoader && <Loader />}
          {bookingHistory && (
            <div className="row mt-5 ">
              <div className="col col-10 offset-1">
                <div className="row">
                  <div className="col-8 col-sm-9">
                    <h5 className="font-chewy-regular text-start">
                      Hey {bookingHistory?.data?.customerName}
                    </h5>
                    <section className="d-flex text-start">
                      <IconComponent
                        iconName={mdiPhone}
                        size={0.8}
                      />
                      <a
                        className="ms-sm-1 text-white"
                        href={`tel:+91-${bookingHistory?.data?.customerPhone}`}>
                        +91-{bookingHistory?.data?.customerPhone}
                      </a>
                    </section>
                  </div>
                  <div className="col-3 col-sm-3">
                    <label>
                      <img
                        src={profilePic || Photo}
                        alt={bookingHistory.data.customerName}
                        className="profile-photo "
                        onClick={FileUploader}
                      />
                      {showFileUploader && !profilePic && (
                        <input
                          type="file"
                          className="f-2"
                          onChange={profileFileHandler}
                        />
                      )}
                    </label>
                  </div>
                </div>

                <div className={`row mt-2 mt-sm-5  `}>
                  <div
                    className={`col border p-3 mt-5 ${styles.bookingDetail}`}>
                    <div className="row mt-2 ">
                      <div className=" col-sm-2 ">
                        <p className="fw-bold ">Valid From</p>
                      </div>
                      <div className=" col-sm-2 ">
                        <p className="fw-bold ">No.of tickets</p>
                      </div>

                      <div className=" col-sm-2 ">
                        <p className="fw-bold ">Payment Mode</p>
                      </div>

                      <div className=" col-sm-2 ">
                        <p className="fw-bold">Actual Amount</p>
                      </div>

                      <div className=" col-sm-2 ">
                        <p className="fw-bold">Paid Amount</p>
                      </div>

                      <div className=" col-sm-2 ">
                        <p className="fw-bold">Expiry Date</p>
                      </div>
                    </div>

                    {bookingHistory?.data?.booking?.map((booking) => {
                      return (
                        <div className="row mt-2  mt-sm-1 mb-4">
                          <div className=" col-sm-2  ">
                            {booking?.validFrom.substring(0, 10)}
                          </div>
                          <div className="  col-sm-2 mt-3 mt-sm-1">
                            {booking?.numOfTickets}
                          </div>
                          <div className="col-sm-2 mt-3 mt-sm-1 ">
                            {booking?.paymentMode}
                          </div>

                          <div className=" col-sm-2 mt-4 mt-sm-1">
                            {booking?.actualAmount}
                          </div>
                          <div className="  col-sm-2 mt-4 mt-sm-1">
                            {booking?.paidAmount}
                          </div>

                          <div className=" col-sm-2 mt-4 mt-sm-1">
                            {booking?.expiryDate.substring(0, 10)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!showLoader &&
            (!bookingHistory ||
              bookingHistory?.data?.booking?.length === 0) && <NoBooking />}
        </>
      </div>
    </div>
  );
};
export default BookingHistory;
