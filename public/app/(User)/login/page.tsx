import FormLogin from "@/ui/frontend/user/login/form-login";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
// import "./style.css";

export const metadata: Metadata = {
  title: `เข้าสู่ระบบ - ${metaConstants.title}`,
};

export default function LoginPage() {
  return (
    <div className=" mx-auto login-page min-h-screen bg-[#eeeeee]">
      <div className="sm:absolute top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-[90%] md:w-[800px] m-auto py-5">
        <FormLogin />
      </div>
    </div>
  );
}
