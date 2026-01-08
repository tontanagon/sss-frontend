import RoleCreatePage from "@/ui/frontend/admin/user-manager/role/create";
import Breadcrums from "@/ui/frontend/component/breadcrums";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `เพิ่มสิทธิ์ - ${metaConstants.title}`,
};

export default function roleCreatePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการสิทธิ์" />
      <div className="my-5 text-[32px] font-bold">เพิ่มสิทธิ์</div>
      <RoleCreatePage />
    </div>
  );
}
