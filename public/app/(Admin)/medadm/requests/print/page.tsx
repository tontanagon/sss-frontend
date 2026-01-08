import Print from "@/ui/frontend/admin/requests/print";
import { Suspense } from "react";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `พิมพ์รายการคำขอ - ${metaConstants.title}`,
};
export default function printPage() {
  return (
    <div className="container min-w-full min-h-screen">
      <Suspense>
        <Print />
      </Suspense>
    </div>
  );
}
