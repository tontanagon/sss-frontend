import CoreConfigsManagementPage from "@/ui/frontend/admin/setting-website";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการเว็บไซต์ - ${metaConstants.title}`,
};

export default function coreConfigsManagementPage() {
  return (
    <div className="container min-w-full px-4 my-3 min-h-screen">
      <div className="my-5 md:text-3xl text-lx font-bold">จัดการเว็บไซต์</div>
      <CoreConfigsManagementPage />
    </div>
  );
}
