import NotiRead from "@/ui/frontend/user/notification/noti-read";
import NotiUnRead from "@/ui/frontend/user/notification/noti-unread";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `การแจ้งเตือน - ${metaConstants.title}`,
};

export default function notificationPage() {
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h5 className="lg:text-3xl md:text-2xl sm:text-lg text-md font-bold lg:my-10 md:my-7 my-5">
        Notification
      </h5>
      <TabGroup defaultIndex={0}>
        <TabList className="flex gap-[50px]">
          <Tab className="text-lg font-semibold data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] cursor-pointer">
            ยังไม่ได้อ่าน
          </Tab>
          <Tab className="text-lg font-semibold data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] cursor-pointer">
            อ่านแล้ว
          </Tab>
        </TabList>
        <TabPanels className="mt-3 relative min-h-[100px]">
          <TabPanel unmount={false} as={Fragment}>
            <Transition
              appear
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200 absolute"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="relative md:my-7 my-5">
                <NotiUnRead />
              </div>
            </Transition>
          </TabPanel>
          <TabPanel unmount={false} as={Fragment}>
            <Transition
              appear
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200 absolute"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="relative md:my-7 my-5">
                <NotiRead />
              </div>
            </Transition>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
