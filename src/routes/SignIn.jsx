import React, { useState } from "react";
import Oauth from "../components/Oauth";
import ErrorAlert from "../components/ErrorAlert";
import Logo from "../components/Logo";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { sendEmailVerificationLink, signInUser } from "../firebase";
import { toast } from "react-toastify";

const SignIn = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const { email, password } = userDetails;

  //get input value
  const onChange = (e) => {
    let changingInputId = e.target.id;
    let changingInputValue = e.target.value;

    //check if changingInputId is email
    if (changingInputId === "email") {
      setUserDetails({ ...userDetails, email: changingInputValue });
      return;
    }

    //check if changingInputValue is password
    if (changingInputId === "password") {
      setUserDetails({ ...userDetails, password: changingInputValue });
      return;
    }
  };

  //submit signin form
  const formSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    //check email address
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      setError(true);
    }

    //check password
    if (password === "" || password.length < 4 || password.length > 10) {
      setError(true);
      return;
    }
    setError(false);

    //continue if form is valid
    setSigningIn(true);

    try {
      //sign user in
      const user = await signInUser(email, password);

      //if account is not yet verified
      if (!user.emailVerified) {
        toast.error("Please verify your account");

        //send verification email
        sendEmailVerificationLink()
          .then((linkSent) => {
            toast.success(linkSent);
          })
          .catch((error) => {
            throw new Error(error);
          });
        return;
      }

      //if account is verified
      if (user.emailVerified) {
        console.log(user);
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("user not found");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setUserDetails({
        email: "",
        password: "",
      });
      setSigningIn(false);
    }
  };
  return (
    <section className="bg-gray-100 h-screen min-h-[600px] flex items-center justify-center">
      <div className="flex flex-col items-start gap-4 w-[90%] max-w-md mx-auto">
        <Logo />

        {/*registration form */}
        <div className="bg-white w-full p-8 rounded-lg shadow-md">
          <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Access Your Account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={formSubmit}
          >
            {/* input props (htmlFor, label, type, name, id, placeholder) */}
            <div>
              <Input
                htmlFor={"email"}
                label={"Your email"}
                type={"text"}
                name={"email"}
                id={"email"}
                placeholder={"Your name @gmail.com"}
                onChange={onChange}
                value={email}
              />
              {error ? (
                email === "" ? (
                  <ErrorAlert errorMessage={"Field cannot be empty"} />
                ) : !email.includes("@") || !email.includes(".") ? (
                  <ErrorAlert errorMessage={"Invalid Email"} />
                ) : null
              ) : null}
            </div>

            {/* input props (htmlFor, label, type, name, id, placeholder) */}
            <div>
              <Input
                htmlFor={"password"}
                label={"Password"}
                type={"password"}
                name={"password"}
                id={"password"}
                placeholder={"••••••••"}
                onChange={onChange}
                value={password}
              />
              {error ? (
                password === "" ? (
                  <ErrorAlert errorMessage={"Password cannot be empty"} />
                ) : password.length < 4 ? (
                  <ErrorAlert errorMessage={"Atleast 4 characters"} />
                ) : password.length > 10 ? (
                  <ErrorAlert errorMessage={"Maximum 10 characters"} />
                ) : null
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className={`w-full text-gray-600  bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  signingIn && "pointer-events-none"
                }`}
              >
                {signingIn ? "Signing in..." : " Signin"}
              </button>
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                Or
              </div>
              <Oauth />
              <div className="mt-5 flex items-center justify-between flex-wrap">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                  Don't have an account?{" "}
                  <Link
                    to={"/sign-up"}
                    className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                  >
                    Signup here
                  </Link>
                </p>
                <Link
                  to={"/forget-Password"}
                  className=" hover:underline text-sm font-light text-gray-500 dark:text-gray-400 "
                >
                  Recover account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
