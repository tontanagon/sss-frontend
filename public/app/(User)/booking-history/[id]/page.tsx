import ConfirmPageElement from "@/ui/frontend/user/booking-history-page/confirm-page";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `รายละเอียดการจอง - ${metaConstants.title}`,
};

export default function ConfirmPage() {
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <ConfirmPageElement />
    </div>
  );
}
