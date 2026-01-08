import CategoryCreatePage from "@/ui/frontend/admin/categories/create";
import Breadcrums from "@/ui/frontend/component/breadcrums"

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `เพิ่มหมวดหมู่ - ${metaConstants.title}`,
};

export default function categoryCreatePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการหมวดหมู่" />
      <div className="my-5 text-[32px] font-bold">เพิ่มหมวดหมู่</div>
      <CategoryCreatePage />
    </div>
  );
}
