import Breadcrums from "@/ui/frontend/component/breadcrums";
import PersonalInfornalPage from "@/ui/frontend/user/personal-information";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `ข้อมูลส่วนตัว - ${metaConstants.title}`,
};

export default function personalInfornalPage() {
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Breadcrums name="" />
      <div className="text-[32px] font-bold mt-3">ข้อมูลส่วนตัว</div>
      <PersonalInfornalPage />
    </div>
  );
}
