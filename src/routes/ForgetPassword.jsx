import React, { useState } from "react";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Oauth from "../components/Oauth";
import { Link } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import { recoverAccount } from "../firebase";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [retrieving, setRetrieving] = useState(false);

  //submit retrieve account form
  const formSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    //check email
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      setError(true);
      return;
    }
    setError(false);

    //continue if form is valid
    setRetrieving(true);
    try {
      //send link to email to reset password
      const linkSent = await recoverAccount(email);
      toast.success(linkSent);
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    } finally {
      setRetrieving(false);
      setEmail("");
    }
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <section className="bg-gray-100 h-screen min-h-[450px] flex items-center justify-center">
      <div className="flex flex-col items-start gap-4 w-[90%] max-w-md mx-auto">
        <Logo />

        {/*registration form */}
        <div className="bg-white w-full p-8 rounded-lg shadow-md">
          <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Retrieve Your Account
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

            <div>
              <button
                type="submit"
                className={`w-full text-gray-600  bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  retrieving && "pointer-events-none"
                }`}
              >
                {retrieving ? "Retrieving..." : " Retrieve"}
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
                  to={"/sign-in"}
                  className=" hover:underline text-sm font-light text-gray-500 dark:text-gray-400 "
                >
                  Signin
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
