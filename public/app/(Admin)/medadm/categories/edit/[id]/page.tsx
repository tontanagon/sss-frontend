import Breadcrums from "@/ui/frontend/component/breadcrums";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
import CategoryEditPage from "@/ui/frontend/admin/categories/edit";

export const metadata: Metadata = {
  title: `แก้ไขหมวดหมู่ - ${metaConstants.title}`,
};

export default function categoryEditPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการหมวดหมู่" />
      <div className="my-5 text-[32px] font-bold">แก้ไขหมวดหมู่</div>
      <CategoryEditPage />
    </div>
  );
}
