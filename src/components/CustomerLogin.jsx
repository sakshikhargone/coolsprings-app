import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomer, login, signUp } from "../services/customer";
import { CustomerCredentials } from "../model/customerCredentials";
import Heading from "./Heading";
import styles from "../css/CustomerLogin.module.css";

const CustomerLogin = () => {
  const navigator = useNavigate();
  const [customerCredentials, setCustomerCredentials] = useState(
    new CustomerCredentials()
  );
  const [disableSignup, setDisableSignup] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (
      mobileRegex.test(customerCredentials.customerPhone) &&
      customerCredentials.customerPassword &&
      emailRegex.test(customerCredentials.customerEmail)
    ) {
      setDisableSignup(true);
    } else {
      setDisableSignup(false);
    }

    if (!customerCredentials.customerPhone) return;
    const custDetail = async () => {
      const customerDetail = await getCustomer(
        customerCredentials.customerPhone
      );

      const customerPassword = customerDetail?.data?.customerPassword;
      if (customerCredentials.customerPassword === customerPassword) {
        setDisableLogin(true);
      } else {
        setDisableLogin(false);
      }
    };
    custDetail();
  }, [customerCredentials]);

  const loginHandler = async () => {
    const { statusCode, data } = await login(customerCredentials);
    
    if (statusCode === 201 || statusCode === 302) {
      const token = data?.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("customerId", customerCredentials?.customerId);
      navigator(`/bookings/${customerCredentials.customerId}`);
    }
  };

  const signUpHandler = async () => {
    
    const signupResponse = await signUp(customerCredentials);
    const token = signupResponse?.data?.token;
    if (token) {
      sessionStorage.setItem("token", token);
      navigator(`/bookings/${customerCredentials.customerId}`);
    }
  };

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    const oldPhoneNumber = customerCredentials?.customerPhone;
    setCustomerCredentials((old) => ({
      ...old,
      [name]: value,
    }));

    if (name === "customerPhone") {
      if (value && !mobileRegex.test(value)) {
        setError("mobile number is invalid");
      } else if (!value) {
        setError("mobile number is required");
      } else if (value.length === 10 && oldPhoneNumber !== value) {
        setTimeout(() => setError(false), 1000);
        const response = await getCustomer(value);
        const customerId = response?.data?.customerId;
        const customerEmail = response?.data?.customerEmail;

        if (customerEmail?.length > 0) {
          setIsExistingCustomer(true);
        }
        setCustomerCredentials((old) => ({
          ...old,
          customerId,
          customerEmail,
        }));
      }
    }
    if (name === "customerEmail") {
      if (!value) {
        setMessage("email is required");
      } else if (!emailRegex.test(value)) {
        setMessage("email is invalid");
      } else {
        setTimeout(() => setMessage(false), 1000);
      }
    }
    if (name === "customerPassword") {
      if (value.length < 6) {
        setValidationMsg("password  must include 6 digits");
        setTimeout(() => setValidationMsg(false), 1000);
      }
    }
  };

  return (
    <div className="row">
      <div className={` col-12 col-sm-8 offset-sm-5 `}>
        <Heading content={"Login"} />
        <form
          className={`${styles.loginBg} `}
          noValidate>
          <div className="row py-sm mt-sm-4 mt-4 ms-sm-4">
            <div className="col-4 col-sm-4 ">
              <label
                htmlFor="phone"
                className=" ms-2">
                Mobile no.
              </label>
            </div>
            <div className="col-7 col-sm-6">
              <input
                type="tel"
                className="form-control"
                name="customerPhone"
                onChange={inputHandler}
                value={customerCredentials.customerPhone}
                maxLength={10}
                autoComplete="off"
                inputMode="numeric"
              />
              {error && (
                <p className="position-absolute text-danger  ms-sm-1">
                  {error}
                </p>
              )}
            </div>
          </div>
          {!isExistingCustomer &&
            customerCredentials?.customerId?.length > 0 && (
              <div className="row mt-4 mt-sm-4 ms-sm-4 ">
                <div className="col-4 col-sm-4">
                  <label
                    htmlFor="email"
                    className=" ms-2 ">
                    Email{" "}
                  </label>
                </div>
                <div className="col-7 col-sm-6">
                  <input
                    type="email"
                    className="form-control "
                    name="customerEmail"
                    onChange={inputHandler}
                    value={customerCredentials.customerEmail}
                  />
                  {message && (
                    <p className="position-absolute text-danger  ms-sm-1">
                      {message}
                    </p>
                  )}
                </div>
              </div>
            )}
          {customerCredentials?.customerId?.length > 0 && (
            <div className="row mt-5 mt-4 ms-sm-4 mt-sm-4">
              <div className="col-4 col-sm-4">
                <label
                  htmlFor="password"
                  className=" ms-2">
                  Password{" "}
                </label>
              </div>
              <div className="col-7 col-sm-6">
                <input
                  type="password"
                  className="form-control "
                  name="customerPassword"
                  minLength={6}
                  onChange={inputHandler}
                />
                {validationMsg && (
                  <p className="position-absolute text-danger   ms-sm-1">
                    {validationMsg}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="row mt-4 mt-sm-4 mb-2 mb-sm-3 ms-4 ms-sm-5 ">
            <div className="col-5 col-sm-6 d-grid mx-auto">
              {isExistingCustomer && (
                <button
                  type="button"
                  className="btn btn-success  ms-sm-4"
                  onClick={loginHandler}
                  disabled={!disableLogin}>
                  Login
                </button>
              )}
              {!isExistingCustomer &&
                customerCredentials?.customerPhone?.length === 10 &&
                customerCredentials?.customerId?.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary  ms-sm-4"
                    onClick={signUpHandler}
                    disabled={!disableSignup}>
                    Sign Up
                  </button>
                )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CustomerLogin;
