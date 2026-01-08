import Breadcrums from "@/ui/frontend/component/breadcrums";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
import TagCreatePage from "@/ui/frontend/admin/tags/create";

export const metadata: Metadata = {
  title: `เพิ่มTag - ${metaConstants.title}`,
};

export default function tagCreatePage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการTag" />
      <div className="my-5 text-[32px] font-bold">เพิ่ม Tag</div>
      <TagCreatePage />
    </div>
  );
}
