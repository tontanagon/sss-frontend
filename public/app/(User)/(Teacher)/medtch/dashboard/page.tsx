import Dashboard from "@/ui/frontend/admin/dashboard/dashboard";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `ภาพรวม - ${metaConstants.title}`,
};

export default function teacherPage() {
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Dashboard />
    </div>
  );
}
