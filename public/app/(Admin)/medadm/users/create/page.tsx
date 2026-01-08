import UserCreatePage from "@/ui/frontend/admin/user-manager/user/create";
import Breadcrums from "@/ui/frontend/component/breadcrums";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `เพิ่มผู้ใช้งาน - ${metaConstants.title}`,
};

export default function userCreatePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการผู้ใช้" />
      <div className="my-5 text-[32px] font-bold">เพิ่มผู้ใช้งาน</div>
      <UserCreatePage />
    </div>
  );
}
