"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import MicrosoftLogin from "./microsoft-login-button";
import { useRouter } from "nextjs-toploader/app";

export default function FormLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (res?.error) {
      setError("Email หรือ รหัสผ่านไม่ถูกต้อง");
    } else {
      //for product
      await fetch("/api/auth/session?update");
      router.push("/medadm");
    }
  };

  return (
    <div className="flex justify-center bg-white shadow-md rounded-md mx-auto w-full md:w-[800px] flex-col md:flex-row">
      <div className="flex md:w-[300px] justify-center items-center flex-col rounded-md bg-[#8989ab] py-10">
        <Link href="/">
          <img src={"/images/logo.png"} className="w-30 h-30 mx-auto" />
          <h1 className="text-xl font-bold text-white">
            ระบบยืม-คืนวัสดุอุปกรณ์
          </h1>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 lg:px-8 py-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            เข้าสู่ระบบ
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm sm:px-15 px-0">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                อีเมล
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0055CA] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  รหัสผ่าน
                </label>
              </div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0055CA] sm:text-sm/6"
                />
              </div>
              {error && (
                <p className="block text-sm/6 font-medium text-red-500">
                  {error}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#0055CA] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#0055CA] cursor-pointer"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>

          <div className="text-gray-300 mt-7">
            <hr />
          </div>

          <div className="flex flex-col">
            <MicrosoftLogin />
            {/* <p className="mt-5 text-center text-sm/6 text-gray-500">
              No Have Account
              <Link
                href="/register"
                className="font-semibold text-[#0055CA] hover:text-blue-800 px-2"
              >
                Register
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
