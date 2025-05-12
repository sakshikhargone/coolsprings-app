import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { getTicketDetail } from "../services/ticket";
import Heading from "../components/Heading";
import Loader from "./Loader";
import NoBooking from "./NoBooking";

const DetailOfBooking = () => {
  const { bId } = useParams();
  const [booking, setBooking] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [qrCodeData, setQrCodeData] = useState();

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 3000);

    const ticketDetail = async () => {
      const bookingData = await getTicketDetail(bId);
      setBooking(bookingData);
      const encodedData = window.btoa(bookingData);
      setQrCodeData(encodedData);
    };

    setTimeout(() => ticketDetail(), 3000);
  }, [bId]);
  return (
    <div className="row">
      <div className="col col-sm-10 offset-sm-1">
        <Heading
          content={"  Here are your tickets!"}
          className="ms-sm-5"
        />
        {showLoader && <Loader />}

        {booking &&
          booking?.data?.ticketId?.map((ticketId, index) => {
            return (
              <>
                <div className="row px-1 py-1 px-sm-2 py-sm-2">
                  <div className="col-4 col-sm-4 border  px-1 py-1 px-sm-1 py-sm-1">
                    <QRCode
                      value={qrCodeData}
                      className={`w-75 h-75 mt-sm-4 ms-2 ms-sm-4`}
                    />
                  </div>
                  <div className="col-8 col-sm-8 border px-sm-3 py-sm-1 px-1 py-1 ">
                    <h4 className="mt-sm-4">Door open at 10:00</h4>
                    <p className="mt-2 mt-sm-4">
                      Ticket {index + 1} of {booking.data.ticketId?.length}
                      &rarr; {ticketId.ticketId.substring(0, 4) || "N/A"}
                    </p>
                    <p className="mt-2 mt-sm-4">
                      This ticket is valid{" "}
                      {new Date(booking.data.validFrom).toLocaleDateString()}{" "}
                      10:00 am to
                      {new Date(
                        booking.data.expiryDate
                      ).toLocaleDateString()}{" "}
                      06:00 pm.
                    </p>
                    <hr className="mt-sm-2 bg-light" />
                    <p className=" mt-sm-1">
                      # One way ticket only # Damaged ticket can not be accepted{" "}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        {!showLoader && (!booking || !booking?.data?.length === 0) && (
          <NoBooking />
        )}
      </div>
    </div>
  );
};
export default DetailOfBooking;
