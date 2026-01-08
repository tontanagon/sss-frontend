import TableAdmin from "@/ui/frontend/admin/products/table-admin-header";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการวัสดุ-อุปกรณ์ - ${metaConstants.title}`,
};

export default function productItemPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <div className="my-5 text-[32px] font-bold">วัสดุอุปกรณ์</div>
      <TableAdmin />
    </div>
  );
}
  