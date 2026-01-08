import RoleEditPage from "@/ui/frontend/admin/user-manager/role/edit";
import Breadcrums from "@/ui/frontend/component/breadcrums"
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `แก้ไขสิทธิ์ - ${metaConstants.title}`,
};

export default function roleEditPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการสิทธิ์" />
      <div className="my-5 text-[32px] font-bold">แก้ไขสิทธิ์</div>
      <RoleEditPage />
    </div>
  );
}
