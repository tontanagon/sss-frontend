import MenuQuery from "@/ui/frontend/admin/user-manager/role/menu-query";
import TableItemAdmin from "@/ui/frontend/admin/user-manager/role/table-admin-header";
import Pagination from "@/ui/layout/pagination";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการสิทธิ์ผู้ใช้งาน - ${metaConstants.title}`,
};

export default function roleManagePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <div className="my-5 text-[32px] font-bold">จัดการสิทธิ์ผู้ใช้งาน</div>
      <MenuQuery />
      <TableItemAdmin />
      {/* <Pagination /> */}
    </div>
  );
}
