import ProductCreatePage from "@/ui/frontend/admin/products/create";
import Breadcrums from "@/ui/frontend/component/breadcrums"
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `เพิ่มวัสดุ-อุปกรณ์ - ${metaConstants.title}`,
};
export default function productCreatePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการวัสดุ"/> 
      <div className="my-5 text-[32px] font-bold">เพิ่มวัสดุ - อุปกรณ์</div>
      <ProductCreatePage />
    </div>
  );
}
