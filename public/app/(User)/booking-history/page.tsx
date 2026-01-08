import Taps from "@/ui/frontend/user/booking-history-page/taps";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `ประวัติการจอง - ${metaConstants.title}`,
};

export default function bookinkHistoryPage() {
  return (
    <div className="container mx-auto min-h-screen px-4">
        <div className="text-black md:text-3xl text-xl font-bold md:my-10 my-5">Booking History</div>
        <Taps/>
    </div>
  );
}

