import EditCoreConfigsPage from "@/ui/frontend/admin/setting-website/edit";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
import Breadcrums from "@/ui/frontend/component/breadcrums";

export const metadata: Metadata = {
  title: `แก้ไขการตั้งค่าเว็บไซต์ - ${metaConstants.title}`,
};

export default function editCoreConfigsPage() {
  return (
    <div className="container min-w-full px-4 my-3">
      <Breadcrums name="จัดการเว็บไซต์" />
      <div className="my-5 md:text-3xl text-lx font-bold">แก้ไขการตั้งค่าเว็บไซต์</div>

      <EditCoreConfigsPage />
    </div>
  );
}
