import TableItemAdmin from "@/ui/frontend/admin/tags/table-admin-header";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการTag - ${metaConstants.title}`,
};

export default function productTypePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <div className="my-5 text-[32px] font-bold">Tag</div>
      <TableItemAdmin />
    </div>
  );
}
