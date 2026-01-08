import TapTableApprove from "@/ui/frontend/teacher/tap_table_approve";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `จัดการคำขออนุมัติ - ${metaConstants.title}`,
};
export default function approveManagement(){
    return(
        <div className="container mx-auto min-h-screen px-4">
            <div className="md:my-10 my-5 md:text-3xl text-xl font-bold">จัดการคำขออนุมัติ</div>
            <TapTableApprove />
        </div>
    )
}