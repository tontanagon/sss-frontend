import Taps from "@/ui/frontend/admin/requests/taps";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `รายการคำขอ - ${metaConstants.title}`,
};

export default function requestAdminPage() {
  return (
    <div className="container min-h-screen min-w-full px-4">
      <Taps />
    </div>
  );
}
