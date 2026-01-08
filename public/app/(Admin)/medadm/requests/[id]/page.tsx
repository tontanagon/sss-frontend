import ConfirmPageElement from "@/ui/frontend/admin/requests/confirm-page";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `รายละเอียดคำขอ - ${metaConstants.title}`,
};
export default function confirmPage() {
  return (
    <div className="container min-w-full px-4 min-h-screen">
      <ConfirmPageElement />
    </div>
  );
}
