"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/zustand/zustand";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const router = useRouter();
  const testInputs = /^[^<>&/=]*$/;
  const securityTest = (text) => {
    const isValid = testInputs.test(text);
    return isValid;
  };

  const { login } = useCartStore((state) => ({
    login: state.login,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!securityTest(email) || !securityTest(pass)) {
      alert("Invalid format email/password!");
      return;
    }
    const success = await login(email, pass);
    if (!success) {
      alert("Invalid email/password ");
      return;
    }
    router.push("/");
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center mt-2 bg-white">
        <div className="card max-w-sm shadow-2xl bg-white p-2">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control mb-1">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-darkBlack"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control mb-1">
              <label className="input input-bordered flex items-center gap-2 text-darkBlack">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
              <label className="label">
                <Link
                  href="/forgot-password"
                  className="label-text-alt link link-hover text-forestGreen"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-2">
              <button className="btn bg-clearGreen text-offWhite hover:bg-forestGreen w-full">
                Login
              </button>
            </div>
            <h2 className="text-md mt-2 text-center divider">OR</h2>
            <label className="label flex justify-center">
              <Link
                href="/create-account"
                className="label-text-alt link link-hover text-forestGreen"
              >
                Don&apos;t have account yet? Create One!
              </Link>
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
