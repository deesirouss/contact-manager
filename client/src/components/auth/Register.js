import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { register } from "../../services/authServices";
import { ShowToastr } from "../../common/Toastr";

//validation for mandatory fields
const required = (value) => {
  if (!value) {
    return <div className="text-warning">This field is required!</div>;
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [registration, setRegistration] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    const names = e.target.name;
    const value = e.target.value;
    setRegistration({ ...registration, [names]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      register(
        registration.user_name,
        registration.user_email,
        registration.user_password
      ).then(
        (response) => {
          ShowToastr("Register successful!");
          props.history.push("/login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">
                  Name<span className="text-danger">*</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="user_name"
                  value={registration.user_name}
                  onChange={handleInput}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email<span className="text-danger">*</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="user_email"
                  value={registration.user_email}
                  onChange={handleInput}
                  validations={[required]}
                />
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "text-warning"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password<span className="text-danger">*</span>
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="user_password"
                  value={registration.user_password}
                  onChange={handleInput}
                  validations={[required]}
                />
              </div>
              <div className="form-group mt-2">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}
          <CheckButton className="d-none" ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
