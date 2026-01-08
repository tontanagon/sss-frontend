import TableAdmin from "@/ui/frontend/admin/types/table-admin-header";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการประเภท - ${metaConstants.title}`,
};

export default function typeManagePage() {
  return (
    <div className="container mx-auto pb-50 px-4 min-h-screen">
      <div className="px-3 py-10 text-[32px] font-bold">ประเภท</div>
      <TableAdmin />
      {/* <Pagination /> */}
    </div>
  );
}
