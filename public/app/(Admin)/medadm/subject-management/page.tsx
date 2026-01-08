import SubjectManagementPage from "@/ui/frontend/admin/subject-management/index";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการกระบวนวิชา - ${metaConstants.title}`,
};

export default function subjectManagementPage() {
  return (
    <div className="container min-w-full min-h-screen px-4">
      <div className="md:my-5 my-2 md:text-3xl text-lx font-bold">จัดการกระบวนวิชา</div>
      <SubjectManagementPage />
    </div>
  );
}
