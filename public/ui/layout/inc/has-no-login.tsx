'use client'

import Link from "next/link";

export default function HasNoLogIn() {
  return (
    <>
      <Link
        href="/login"
        className="text-white bg-[#0055CA] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-[30px] text-[12px] sm:text-[16px] sm:px-[50px] md:py-[10px] px-[30px] py-[5px] text-center"
      >
        Sign in
      </Link>
    </>
  );
}
