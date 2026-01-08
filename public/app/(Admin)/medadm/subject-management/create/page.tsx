import CreateSubjectPage from "@/ui/frontend/admin/subject-management/subject-add";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
import Breadcrums from "@/ui/frontend/component/breadcrums";

export const metadata: Metadata = {
  title: `สร้างกระบวนวิชา - ${metaConstants.title}`,
};


export default function createSubjectPage() {
  return (
    <div className="container min-w-full min-h-screen px-4">
      <Breadcrums name="จัดการกระบวนวิชา" />
      <div className="my-5 md:text-3xl text-lx font-bold">สร้างกระบวนวิชา</div>
      <CreateSubjectPage />
    </div>
  );
}
