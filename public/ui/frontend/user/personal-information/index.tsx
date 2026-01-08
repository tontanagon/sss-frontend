"use client";
import Breadcrums from "@/ui/frontend/component/breadcrums";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";

export default function PersonalInfornalPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user_information = session?.user;

  const handleLogout = async () => {
    if (session) {
      await signOut({ callbackUrl: "/" });
      await fetch("/api/logout");
    }
  };

  const InfoBox = ({ children }: any) => (
    <div className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full mt-3 rounded-[5px] border border-[#D9D9D9] bg-gray-100 p-[14px_20px] shadow-sm">
      {children}
    </div>
  );

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 py-5">
        <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
          ชื่อ - สกุล
          <InfoBox>{user_information?.name}</InfoBox>
        </div>
        <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
          อีเมล
          <InfoBox>{user_information?.email}</InfoBox>
        </div>
        <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
          รหัสนักศึกษา
          <InfoBox>{user_information?.user_code ?? "-"}</InfoBox>
        </div>
        <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
          ชั้นปี
          <InfoBox>{user_information?.user_grade ?? "-"}</InfoBox>
        </div>
        {/* <div>
          <div className="text-base font-semibold">Email</div>
          <p className="p-3 bg-gray-300 border border-gray-400 rounded">
            
          </p>
        </div> */}
      </div>
      <div className="w-full">
        <button
          className="cursor-pointer text-white p-2 bg-red-500 rounded-[10px] w-full"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </div>
    </>
  );
}
