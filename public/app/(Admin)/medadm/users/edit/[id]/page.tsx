import UserEditPage from "@/ui/frontend/admin/user-manager/user/edit";
import Breadcrums from "@/ui/frontend/component/breadcrums";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `แก้ไขผู้ใช้งาน - ${metaConstants.title}`,
};

export default function userEditPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการผู้ใช้" />
      <div className="my-5 text-[32px] font-bold">แก้ไขผู้ใช้งาน</div>
      <UserEditPage />
    </div>
  );
}
