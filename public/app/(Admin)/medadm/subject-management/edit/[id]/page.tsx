import EditSubjectPage from "@/ui/frontend/admin/subject-management/subject-edit";
import Breadcrums from "@/ui/frontend/component/breadcrums";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `แก้ไขกระบวนวิชา - ${metaConstants.title}`,
};

export default function editSubjectPage() {
  return (
    <div className="container min-w-full min-h-screen px-4">
      <Breadcrums name="จัดการกระบวนวิชา" />
      <div className="md:my-5 my-2 md:text-3xl text-lx font-bold">
        แก้ไขกระบวนวิชา
      </div>
      <EditSubjectPage />
    </div>
  );
}
