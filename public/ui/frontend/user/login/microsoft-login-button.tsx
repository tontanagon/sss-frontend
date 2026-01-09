"use client";

import { microsoft_icon } from "@/constants/asset-path";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function MicrosoftLogin() {
  return (
    <button
      className="p-1 flex justify-center items-center gap-1 text-center border border-[#0055CA] hover:text-white hover:bg-[#0055CA] rounded text-sm/6 text-[#0055CA] cursor-pointer"
      onClick={() => {
        signIn("microsoft-entra-id");
      }}
    >
      <Image src={microsoft_icon} alt="icon" width={20} height={20} />
      <div>เข้าสู่ระบบด้วยบัญชี CMU</div>
    </button>
  );
}
