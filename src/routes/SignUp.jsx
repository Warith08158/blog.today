import React, { useState } from "react";
import { Logo, Input } from "../components/components";
import ErrorAlert from "../components/ErrorAlert";
import Oauth from "../components/Oauth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUser,
  sendEmailVerificationLink,
  updateUserProfile,
} from "../firebase";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState(false);
  const { email, password, confirmPassword, name } = userDetails;
  const [creatingAccount, setCreatingAccount] = useState(false);

  //Get input value
  function onChange(e) {
    let changingInputId = e.target.id;
    let changingInputValue = e.target.value;

    setUserDetails(() => ({
      ...userDetails,
      [changingInputId]: changingInputValue,
    }));
  }

  //submit signup form
  async function formSubmit(e) {
    e.preventDefault();
    setError(false);

    //check name
    if (name === "" || name.length < 5 || name.length > 20) {
      setError(true);
    }
    //check email address
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      setError(true);
    }

    //check password
    if (password === "" || password.length < 4 || password.length > 10) {
      setError(true);
    }

    //check confirm password
    if (confirmPassword === "" || confirmPassword !== password) {
      setError(true);
      return;
    }
    setError(false);

    //create new user account
    setCreatingAccount(true);
    try {
      const user = await createUser(email, password);
      await updateUserProfile(name);
      toast.success("Account created");

      //send confirmation email
      sendEmailVerificationLink()
        .then((linkSent) => {
          toast.success(linkSent);
          setTimeout(() => {
            toast.success("You can now sign in");
          }, 3000);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setUserDetails({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      });
      setCreatingAccount(false);
    }
  }

  return (
    <section className="bg-gray-100 h-screen min-h-[800px] flex items-center justify-center">
      <div className="flex flex-col items-start gap-4 w-[90%] max-w-md mx-auto">
        <Logo />

        {/*registration form */}
        <div className="bg-white w-full p-8 rounded-lg shadow-md">
          <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={formSubmit}
          >
            {/* input props (htmlFor, label, type, name, id, placeholder) */}
            <div>
              <Input
                htmlFor={"name"}
                label={"Your name"}
                type={"name"}
                name={"name"}
                id={"name"}
                placeholder={"Your name"}
                onChange={onChange}
                value={name}
              />
              {error ? (
                name === "" ? (
                  <ErrorAlert errorMessage={"Field cannot be empty"} />
                ) : name.length < 5 ? (
                  <ErrorAlert errorMessage={"Atleast 5 characters"} />
                ) : name.length > 20 ? (
                  <ErrorAlert errorMessage={"Maximum 20 characters"} />
                ) : null
              ) : null}
            </div>

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

            {/* input props (htmlFor, label, type, name, id, placeholder) */}
            <div>
              <Input
                htmlFor={"confirmPassword"}
                label={"Confirm password"}
                type={"password"}
                name={"confirmPassword"}
                id={"confirmPassword"}
                placeholder={"••••••••"}
                onChange={onChange}
                value={confirmPassword}
              />
              {error ? (
                confirmPassword === "" ? (
                  <ErrorAlert errorMessage={"Field cannot be empty"} />
                ) : (
                  confirmPassword !== password && (
                    <ErrorAlert errorMessage={"Password doesn't match"} />
                  )
                )
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className={`w-full text-gray-600  bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  creatingAccount && "pointer-events-none"
                }`}
              >
                {creatingAccount ? "Creating Account..." : " Create an account"}
              </button>
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                Or
              </div>
              <Oauth />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
                Already have an account?{" "}
                <Link
                  to={"/sign-in"}
                  className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
