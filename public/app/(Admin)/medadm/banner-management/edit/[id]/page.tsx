import EditBannerPage from "@/ui/frontend/admin/banner-management/banner-edit";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `แก้ไข Banner - ${metaConstants.title}`,
};

export default function editBannerPage() {
  return (
    <div className="container min-w-full min-h-screen px-4">
      <Link
        href="/medadm/banner-management"
        className="flex items-center w-fit gap-2 text-[#264981] hover:text-[#0055ca] text-base font-semibold mt-5"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        <p>กลับ</p>
        <p>จัดการBanner</p>
      </Link>
      <div className="md:my-5 my-2 md:text-3xl text-lx font-bold">แก้ไข Banner</div>
      <EditBannerPage />
    </div>
  );
}
