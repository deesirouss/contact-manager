import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../../services/authServices";
import { ShowToastr } from "../../common/Toastr";

const required = (value) => {
  if (!value) {
    return <div className="text-warning">This field is required!</div>;
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [message, setMessage] = useState("");

  const [userLogin, setuserLogin] = useState({
    user_email: "",
    user_password: "",
  });

  const handleInput = (e) => {
    const names = e.target.name;
    const value = e.target.value;
    setuserLogin({ ...userLogin, [names]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      login(userLogin.user_email, userLogin.user_password).then(
        () => {
          ShowToastr("Login successful!");
          props.history.push("/");
          window.location.reload(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
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
        <Form onSubmit={handleLogin} ref={form}>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">
              Email<span className="text-danger">*</span>
            </label>
            <Input
              type="text"
              className="form-control"
              name="user_email"
              value={userLogin.user_email}
              onChange={handleInput}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_password">
              Password<span className="text-danger">*</span>
            </label>
            <Input
              type="password"
              className="form-control"
              name="user_password"
              value={userLogin.user_password}
              onChange={handleInput}
              validations={[required]}
            />
          </div>
          <div className="form-group mt-3">
            <button className="btn btn-primary btn-block">
              <span>Login</span>
            </button>
          </div>

          <CheckButton className="d-none" ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Login;
