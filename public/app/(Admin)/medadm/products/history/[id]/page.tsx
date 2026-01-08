import HistoryProductTable from "@/ui/frontend/admin/products/product-history";
import Breadcrums from "@/ui/frontend/component/breadcrums";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `ประวัติคลังวัสดุ-อุปกรณ์ - ${metaConstants.title}`,
};

export default function productHistoryPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name='รายการวัสดุ'/> 
      <div className="my-5 text-[32px] font-bold">ประวัติคลังวัสดุ-อุปกรณ์</div>
      <HistoryProductTable />
    </div>
  );
}
