// import TableAdmin from "@/ui/frontend/admin/categories/table-admin-header";
import TableItemAdmin from "@/ui/frontend/admin/categories/table-admin-header";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการหมวดหมู่ - ${metaConstants.title}`,
};

export default function CategoryPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <div className="my-5 text-[32px] font-bold">หมวดหมู่</div>
      <TableItemAdmin />
      {/* <Pagination /> */}
    </div>
  );
}