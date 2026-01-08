import Breadcrums from "@/ui/frontend/component/breadcrums";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
import ProductEditPage from "@/ui/frontend/admin/products/edit";

export const metadata: Metadata = {
  title: `แก้ไขวัสดุ-อุปกรณ์ - ${metaConstants.title}`,
};
export default function productEditPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการวัสดุ" />
      <div className="my-5 text-[32px] font-bold">แก้ไขวัสดุ - อุปกรณ์</div>
      <ProductEditPage /> 
    </div>
  );
}
