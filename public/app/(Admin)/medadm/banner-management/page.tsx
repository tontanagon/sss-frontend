import BannerManagementPage from "@/ui/frontend/admin/banner-management/index";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการ Banner - ${metaConstants.title}`,
};

export default function bannerManagementPage() {
  return (
    <div className="container min-w-full min-h-screen px-4">
      <div className="md:my-5 my-2 md:text-3xl text-lx font-bold">
        จัดการ Banner
      </div>
      <BannerManagementPage />
    </div>
  );
}
