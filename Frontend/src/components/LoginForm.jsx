import { useRef } from "react";
import Input from "./Input";
import Logo from "./Logo.jsx";
import api from "../config/apiCall.js";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const errorRef = useRef("");
  const dispatch = useDispatch();

  const validateForm = () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(emailRef.current.value)) {
      errorRef.current = "Email address must be a Gmail address";
      setTimeout(() => {
        errorRef.current = "";
      }, 1000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const res = await api.login({ email, password });
      if (res.data.statusCode === 200) {
        dispatch(login(res.data.data.user));
      } else {
        alert("Error in Login", res);
        errorRef.current = res;
        setTimeout(() => {
          errorRef.current = "";
        }, 1000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-white  bg-opacity-35 rounded-xl p-10 border border-black/10`}
      >
        <div className="text-center  mb-4 mr-8">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Login</h2>
        {errorRef.current && (
          <p className="text-red-600 mt-8 text-center">{errorRef.current}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              ref={emailRef}
            />
            <Input
              label="Password: "
              placeholder="Enter your Password"
              type="password"
              ref={passwordRef}
            />
            <button
              type="submit"
              className="w-full bg-customOrange text-white font-bold py-2 px-4 rounded"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
