import ItemList from "@/ui/frontend/user/category-page/ItemList";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `หมวดหมู่ - ${metaConstants.title}`,
};

export default function categoryPage() {
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Link
        href="/"
        className="flex items-center w-fit gap-2 text-[#264981] hover:text-[#0055ca] text-base font-semibold mt-5"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        <p>กลับ</p>
        <p>หน้าแรก</p>
      </Link>
      <ItemList />
    </div>
  );
}
