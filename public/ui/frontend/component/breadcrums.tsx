"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "nextjs-toploader/app";

export default function Breadcrums({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center w-fit gap-2 text-[#264981] hover:text-[#0055ca] text-base font-semibold mt-5 cursor-pointer ${className}`}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
      <p>กลับ</p>
      <p>{name}</p>
    </button>
  );
}
