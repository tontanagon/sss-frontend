import Breadcrums from "@/ui/frontend/component/breadcrums";
import TagEditPage from "@/ui/frontend/admin/tags/edit";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `แก้ไขTag - ${metaConstants.title}`,
};

export default function tagEditPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <Breadcrums name="รายการTag" />
      <div className="my-5 text-[32px] font-bold">แก้ไข Tag</div>
      <TagEditPage />
    </div>
  );
}
